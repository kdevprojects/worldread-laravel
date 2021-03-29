import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,
    NgbModule, RouterModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,
    NgbModule, RouterModule
  ]
})
export class SharedModule {}
