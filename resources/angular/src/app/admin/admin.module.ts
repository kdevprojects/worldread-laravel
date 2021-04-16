import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthModule } from '../auth/authentication.module';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { CompetitionCheckoutComponent } from './competition-checkout/competition-checkout.component';
import { LoginComponent } from '../auth/login/login.component';
import { LoginGuard } from '../auth/login.guard';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';
import { RegisterComponent } from '../auth/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { StoryEditorComponent } from './story-editor/story-editor.component';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  { path: 'join', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [AuthenticationGuard],
    children: [
      { path: 'competitions/enter/:param', component: CompetitionCheckoutComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'create', component: StoryEditorComponent },
      { path: '', component: OverviewComponent },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent, OverviewComponent, StoryEditorComponent, CompetitionCheckoutComponent],
  imports: [
    RouterModule.forChild(routes),
    AuthModule, SharedModule,
    QuillModule.forRoot()
  ],
})
export class AdminModule {}
