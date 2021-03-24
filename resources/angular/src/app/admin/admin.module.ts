import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthModule } from '../auth/authentication.module';
import { AuthenticationComponent } from '../auth/authentication.component';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../auth/login/login.component';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';
import { RegisterComponent } from '../auth/register/register.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { StoryEditorComponent } from './story-editor/story-editor.component';

const routes: Routes = [
  { path: 'join', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
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
    RouterModule,
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    AuthModule,
  ],
})
export class AdminModule {}
