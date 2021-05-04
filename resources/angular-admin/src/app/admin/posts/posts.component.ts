import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ImageHandler, Options } from 'ngx-quill-upload';

import { Competition } from 'src/app/models/competition.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/models/post.model';
import Quill from 'quill';
import { Repository } from 'src/app/services/repository.service';

Quill.register('modules/imageHandler', ImageHandler);

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  listView: boolean = true;
  model: any = {};
  submitted = false;
  imageSrc: string;
  postForm: FormGroup;
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
          if (
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg'
          ) {
            // File types supported for image
            if (file.size < 1000000) {
              // Customize file size as per requirement

              // Sample API Call
              const uploadData = new FormData();
              uploadData.append('file', file, file.name);

              try {
                const result = await this.http
                  .post<any>('/api/posts/upload', uploadData, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                  })
                  .toPromise();
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
    private parserFormatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.repo.getPosts();
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      summary: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.minLength(3)]],
      picture: ['', [Validators.required]],
      fileSource: ['', [Validators.required]],
    });
  }

  submit(form: FormGroup) {
    this.submitted = true;
    if (!this.postForm.invalid) {
      const data = {
        title: this.f.title.value,
        body: this.f.body.value,
        summary: this.f.summary.value,
        picture: this.f.fileSource.value,
      };

      this.repo.createPost(data).subscribe(() => {
        this.showList();
        form.reset();
      });
    }
  }

  get posts(): Post[] {
    return this.repo.posts;
  }

  showList() {
    this.listView = true;
  }

  showForm() {
    this.listView = false;
  }

  get f() {
    return this.postForm.controls;
  }

  get title() {
    return this.postForm.get('title');
  }

  get summary() {
    return this.postForm.get('summary');
  }

  get body() {
    return this.postForm.get('body');
  }

  get picture() {
    return this.postForm.get('picture');
  }

  onFileChange(event, form: FormGroup) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.postForm.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }
}
