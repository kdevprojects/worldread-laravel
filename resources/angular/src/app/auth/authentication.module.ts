import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationComponent } from './authentication.component';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from '../auth/login.guard';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule, SharedModule],
  declarations: [AuthenticationComponent, SignUpComponent, LoginComponent, RegisterComponent],
  providers: [AuthenticationService, AuthenticationGuard, LoginGuard],
  exports: [AuthenticationComponent],
})
export class AuthModule {}
