import { RouterModule, Routes } from '@angular/router';

import { CompetitionComponent } from './structure/competition/competition.component';
import { CompetitionsListComponent } from './structure/competitions-list/competitions-list.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './structure/profile/profile.component';
import { StoriesListComponent } from './structure/stories-list/stories-list.component';
import { StoryDetailComponent } from './structure/story-detail/story-detail.component';

const routes: Routes = [
  {
    path: 'members',
    loadChildren: () =>
      import('./admin/admin.module').then((module) => module.AdminModule),
  },
  { path: 'stories', component: StoriesListComponent },
  { path: 'stories/:param', component: StoryDetailComponent },
  { path: 'competitions', component: CompetitionsListComponent },
  { path: 'competitions/:param', component: CompetitionComponent },
  { path: 'profiles/:param', component: ProfileComponent },
  { path: '**', redirectTo: 'stories' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
