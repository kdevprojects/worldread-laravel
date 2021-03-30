import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const formData = this.loginForm.getRawValue();
    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password',
      client_id: environment.oauth_client_id,
      client_secret: environment.oauth_client_secret,
      scope: 'member',
    };

    this.http.post('/api/auth/login', data).subscribe(
      (result: any) => {
        console.log('success');
        console.log(result);
        this.userService.login(result.access_token);
        this.loginForm.reset();
        this.router.navigate(['/members/overview']);
      },
      (error) => {
        console.log('error');
        console.log(error);
        this.showError = true;
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
