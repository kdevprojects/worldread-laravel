import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthModule } from '../auth/authentication.module';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { LoginComponent } from '../auth/login/login.component';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AdminComponent,
    // canActivateChild: [AuthenticationGuard],
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: '/', component: OverviewComponent },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent, OverviewComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    AuthModule,
  ],
})
export class AdminModule {}
