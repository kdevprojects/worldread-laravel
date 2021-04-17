import { AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NgForm } from '@angular/forms';
import { Repository } from '../../services/repository.service';
import { Router } from '@angular/router';
import { Story } from '../../models/story.model';
import { ToastService } from 'src/app/services/toast.service';
import { ImageHandler, Options } from 'ngx-quill-upload';
import Quill from 'quill';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { async } from 'rxjs';
import { promise } from 'selenium-webdriver';

Quill.register('modules/imageHandler', ImageHandler);

@Component({
  selector: 'app-story-editor',
  templateUrl: './story-editor.component.html',
  styleUrls: ['./story-editor.component.scss'],
})
export class StoryEditorComponent implements OnInit, AfterViewInit {
  submitted = false;
  imageSrc: string;
  storyForm: FormGroup;
  quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    imageHandler: {
      upload: (file) => {
        return new Promise(async (resolve, reject) => {

          if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') { // File types supported for image
            if (file.size < 1000000) { // Customize file size as per requirement

            // Sample API Call
              const uploadData = new FormData();
              uploadData.append('file', file, file.name);

              try {
                const result = await this.http.post<any>('/api/stories/upload', uploadData, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                }).toPromise();
                resolve(result.message.url); // RETURN IMAGE URL from response
              } catch (error) {
                reject('Upload failed');
                // Handle error control
                console.error('Error:', error);
              }
            } else {
              reject('Size too large');
             // Handle Image size large logic
            }
          } else {
            reject('Unsupported type');
           // Handle Unsupported type logic
          }
        });
      },
      accepts: ['png', 'jpg', 'jpeg', 'jfif'], // Extensions to allow for images (Optional) | Default - ['jpg', 'jpeg', 'png']
    } as Options,
  };

  @ViewChild('quillJs') el: ElementRef;
  constructor(
    private repo: Repository,
    private router: Router,
    private toastService: ToastService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.storyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      summary: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(3)]],
      picture: ['', [Validators.required]],
      fileSource: ['', [Validators.required]],
    });
  }
  get story(): Story {
    return this.repo.story;
  }
  submit(form: FormGroup) {
    this.submitted = true;
    if (!this.storyForm.invalid) {
      const data = {
        title: this.f.title.value,
        summary: this.f.summary.value,
        body: this.f.body.value,
        picture: this.f.fileSource.value,
      };

      this.repo.createStory(data).subscribe(() => {
        this.showSuccessToast('Story submitted');
        this.router.navigateByUrl('/members/overview');
        form.reset();
      });
    }
  }

  ngAfterViewInit() {}

  showSuccessToast(message: string) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 5000,
    });
  }

  get f() {
    return this.storyForm.controls;
  }

  get title() {
    return this.storyForm.get('title');
  }

  get summary() {
    return this.storyForm.get('summary');
  }

  get body() {
    return this.storyForm.get('body') as FormControl;
  }

  get picture() {
    return this.storyForm.get('picture');
  }

  onFileChange(event, form: FormGroup) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.storyForm.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }
}
