import { Heart, MessageSquare } from 'angular-feather/icons';

import { FeatherModule } from 'angular-feather';
import { NgModule } from '@angular/core';

const icons = {
  MessageSquare,
  Heart
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
