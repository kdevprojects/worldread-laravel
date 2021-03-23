import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [],
})
export class PagesModule {}
