import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  providers: [],
})
export class PagesModule {}
