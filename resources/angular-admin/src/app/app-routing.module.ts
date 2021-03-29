import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';

const routes: Routes = [
  {
    path: 'administration',
    loadChildren: () =>
      import('./admin/admin.module').then((module) => module.AdminModule),
  },
  { path: 'admin', component: WelcomeAdminComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
