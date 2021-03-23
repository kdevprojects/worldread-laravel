import { AuthenticationComponent } from './authentication.component';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [RouterModule, FormsModule, CommonModule],
  declarations: [AuthenticationComponent, SignUpComponent],
  providers: [AuthenticationService, AuthenticationGuard],
  exports: [AuthenticationComponent],
})
export class AuthModule {}
