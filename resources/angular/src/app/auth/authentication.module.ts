import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationComponent } from './authentication.component';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  declarations: [AuthenticationComponent, SignUpComponent, LoginComponent, RegisterComponent],
  providers: [AuthenticationService, AuthenticationGuard],
  exports: [AuthenticationComponent],
})
export class AuthModule {}
