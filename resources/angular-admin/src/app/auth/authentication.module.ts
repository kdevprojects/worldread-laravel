import { AuthService } from './auth.service';
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [LoginComponent],
  providers: [AuthService, AuthenticationGuard, LoginGuard],
  exports: [LoginComponent],
})
export class AuthModule {}
