import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [LoginComponent],
  providers: [AuthenticationGuard],
  exports: [LoginComponent],
})
export class AuthModule {}
