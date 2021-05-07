import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Repository } from 'src/app/services/repository.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent implements OnInit {
  submitted = false;
  imageSrc: string = '_assets/' + this.userService.currentUser?.picture;
  profileForm: FormGroup;

  constructor(
    private repo: Repository,
    private router: Router,
    private toastService: ToastService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      description: [this.profile?.description],
      picture: [''],
      fileSource: [''],
    });
  }

  submit(form: FormGroup) {
    this.submitted = true;
    if (!this.profileForm.invalid) {
      const data = {
        description: this.f.description.value,
        picture: this.f.fileSource.value,
      };

      this.repo.updateProfile(data).subscribe(() => {
        this.showSuccessToast('Profile updated');
        this.router.navigateByUrl('/members/overview');
        form.reset();
      });
    }
  }

  get f() {
    return this.profileForm.controls;
  }

  get profile(): User {
    return this.userService.currentUser;
  }

  showSuccessToast(message: string) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 5000,
    });
  }

  get picture() {
    return this.profileForm.get('picture');
  }

  get description() {
    return this.profileForm.get('description');
  }

  onFileChange(event, form: FormGroup) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.profileForm.patchValue({
          fileSource: reader.result,
        });
      };
    }
  }
}
