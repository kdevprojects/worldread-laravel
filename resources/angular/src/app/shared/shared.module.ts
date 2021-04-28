import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { EllipsisModule } from 'ngx-ellipsis';
import { IconsModule } from '../icons/icons.module';
import { NavbarComponent } from '../structure/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPayPalModule } from 'ngx-paypal';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule, NgxPayPalModule, IconsModule, EllipsisModule
  ],
  declarations: [ToastComponent, NavbarComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule, NgxPayPalModule, ToastComponent, IconsModule, EllipsisModule, NavbarComponent
  ]
})
export class SharedModule {}
