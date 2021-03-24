import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showError: boolean = false;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const formData = this.registerForm.getRawValue();
    this.http.post('/api/user', formData).subscribe(
      (response) => {
        console.log(response);
        this.registerForm.reset();
        this.router.navigate(['/members/login']);
      },
      (error) => {
        console.log(error);
        this.showError = true;
      }
    );
  }
  get email() {
    return this.registerForm.get('email');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get first_name() {
    return this.registerForm.get('first_name');
  }
  get last_name() {
    return this.registerForm.get('last_name');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get password_confirmation() {
    return this.registerForm.get('password_confirmation');
  }
}
