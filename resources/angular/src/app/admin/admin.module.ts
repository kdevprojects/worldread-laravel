import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthModule } from '../auth/authentication.module';
import { AuthenticationComponent } from '../auth/authentication.component';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../auth/login/login.component';
import { LoginGuard } from '../auth/login.guard';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';
import { RegisterComponent } from '../auth/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { StoryEditorComponent } from './story-editor/story-editor.component';

const routes: Routes = [
  { path: 'join', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [AuthenticationGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'create', component: StoryEditorComponent },
      { path: '', component: OverviewComponent },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent, OverviewComponent, StoryEditorComponent],
  imports: [
    RouterModule.forChild(routes),
    AuthModule, SharedModule
  ],
})
export class AdminModule {}
