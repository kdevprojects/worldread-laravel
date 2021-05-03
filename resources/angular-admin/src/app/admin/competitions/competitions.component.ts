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
import Quill from 'quill';
import { Repository } from 'src/app/services/repository.service';

Quill.register('modules/imageHandler', ImageHandler);

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss'],
})
export class CompetitionsComponent implements OnInit {
  listView: boolean = true;
  model: any = {};
  submitted = false;
  imageSrc: string;
  competitionForm: FormGroup;
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
                  .post<any>('/api/competitions/upload', uploadData, {
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
    this.repo.getCompetitions();
    this.competitionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      deadline: ['', [Validators.required]],
      fee: ['', [Validators.required]],
      reward: ['', [Validators.required]],
      picture: ['', [Validators.required]],
      fileSource: ['', [Validators.required]],
    });
  }

  submit(form: FormGroup) {
    this.submitted = true;
    if (!this.competitionForm.invalid) {
      const date = this.parserFormatter.format(this.f.deadline.value);
      const data = {
        name: this.f.name.value,
        description: this.f.description.value,
        fee: this.f.fee.value,
        reward: this.f.reward.value,
        deadline: date,
        picture: this.f.fileSource.value,
      };

      this.repo.createCompetition(data).subscribe(() => {
        this.showList();
        form.reset();
      });
    }
  }

  get competitions(): Competition[] {
    return this.repo.competitions;
  }

  showList() {
    this.listView = true;
  }

  showForm() {
    this.listView = false;
  }

  get f() {
    return this.competitionForm.controls;
  }

  get name() {
    return this.competitionForm.get('name');
  }

  get reward() {
    return this.competitionForm.get('reward');
  }

  get fee() {
    return this.competitionForm.get('fee');
  }

  get deadline() {
    return this.competitionForm.get('deadline');
  }

  get description() {
    return this.competitionForm.get('description') as FormControl;
  }

  get picture() {
    return this.competitionForm.get('picture');
  }

  onFileChange(event, form: FormGroup) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.competitionForm.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }
}
