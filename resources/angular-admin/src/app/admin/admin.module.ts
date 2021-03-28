import { RouterModule, Routes } from '@angular/router';

// import { AdminComponent } from './admin/admin.component';
// import { AuthModule } from '../auth/authentication.module';
// import { AuthenticationGuard } from '../auth/authentication.guard';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { LoginComponent } from '../auth/login/login.component';
// import { LoginGuard } from '../auth/login.guard';
import { NgModule } from '@angular/core';

// import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  // { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  // {
  //   path: '',
  //   component: AdminComponent,
  //   canActivateChild: [AuthenticationGuard],
  //   children: [
  //     { path: 'overview', component: OverviewComponent },
  //     { path: '', component: OverviewComponent },
  //   ],
  // },
];

@NgModule({
  // declarations: [AdminComponent, OverviewComponent],
  // imports: [
  //   RouterModule,
  //   FormsModule,
  //   RouterModule.forChild(routes),
  //   CommonModule,
  //   AuthModule,
  // ],
})
export class AdminModule { }
