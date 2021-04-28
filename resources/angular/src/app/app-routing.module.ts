import { RouterModule, Routes } from '@angular/router';

import { CompetitionComponent } from './structure/competition/competition.component';
import { CompetitionsListComponent } from './structure/competitions-list/competitions-list.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { PostDetailComponent } from './structure/post-detail/post-detail.component';
import { PostsListComponent } from './structure/posts-list/posts-list.component';
import { ProfileComponent } from './structure/profile/profile.component';
import { StoriesListComponent } from './structure/stories-list/stories-list.component';
import { StoryDetailComponent } from './structure/story-detail/story-detail.component';

const routes: Routes = [
  {
    path: 'members',
    loadChildren: () =>
      import('./admin/admin.module').then((module) => module.AdminModule),
  },
  { path: 'home', component: LandingPageComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'posts/:param', component: PostDetailComponent },
  { path: 'stories', component: StoriesListComponent },
  { path: 'stories/:param', component: StoryDetailComponent },
  { path: 'competitions', component: CompetitionsListComponent },
  { path: 'competitions/:param', component: CompetitionComponent },
  { path: 'profiles/:param', component: ProfileComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
