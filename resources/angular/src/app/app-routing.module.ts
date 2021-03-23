import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { StoriesListComponent } from './structure/stories-list/stories-list.component';
import { StoryDetailComponent } from './structure/story-detail/story-detail.component';

const routes: Routes = [
  {
    path: "members",
    loadChildren: () =>
      import("./admin/admin.module").then(module => module.AdminModule),
  },
  { path: "stories", component: StoriesListComponent },
  { path: "stories/:id", component: StoryDetailComponent },
  { path: "**", redirectTo: 'stories' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
