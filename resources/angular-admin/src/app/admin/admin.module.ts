import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthModule } from '../auth/authentication.module';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { CompetitionsComponent } from './competitions/competitions.component';
import { LoginComponent } from '../auth/login/login.component';
import { LoginGuard } from '../auth/login.guard';
import { MembersComponent } from './members/members.component';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';
import { ResultsComponent } from './results/results.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [AuthenticationGuard],
    children: [
      { path: 'results', component: ResultsComponent },
      { path: 'competitions', component: CompetitionsComponent },
      { path: 'members', component: MembersComponent },
      { path: 'overview', component: OverviewComponent },
      { path: '', component: OverviewComponent },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent, OverviewComponent, MembersComponent, CompetitionsComponent, ResultsComponent],
  imports: [SharedModule, RouterModule.forChild(routes), AuthModule],
})
export class AdminModule {}
