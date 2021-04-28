import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule, SharedModule],
  providers: [],
})
export class PagesModule {}
