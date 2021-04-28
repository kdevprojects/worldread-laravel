import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommentEditorComponent } from './structure/comment-editor/comment-editor.component';
import { CompetitionComponent } from './structure/competition/competition.component';
import { CompetitionsListComponent } from './structure/competitions-list/competitions-list.component';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { ErrorHandlerService } from './services/error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModelModule } from './models/model.module';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesModule } from './pages/pages.module';
import { PostDetailComponent } from './structure/post-detail/post-detail.component';
import { PostsListComponent } from './structure/posts-list/posts-list.component';
import { ProfileComponent } from './structure/profile/profile.component';
import { ScrollProgressDirective } from './directives/scroll-progress.directive';
import { SharedModule } from './shared/shared.module';
import { StoriesListComponent } from './structure/stories-list/stories-list.component';
import { StoryDetailComponent } from './structure/story-detail/story-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    StoriesListComponent,
    StoryDetailComponent,
    CommentEditorComponent,
    DebounceClickDirective,
    ScrollProgressDirective,
    ProfileComponent,
    CompetitionComponent,
    CompetitionsListComponent,
    PostDetailComponent,
    PostsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModelModule,
    AdminModule,
    PagesModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
  ],
  providers: [
    ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: ErrorHandlerService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
