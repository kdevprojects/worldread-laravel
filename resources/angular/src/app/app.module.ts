import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommentEditorComponent } from './structure/comment-editor/comment-editor.component';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { ErrorHandlerService } from './services/error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IconsModule } from './icons/icons.module';
import { ModelModule } from './models/model.module';
import { NavbarComponent } from './structure/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { ScrollProgressDirective } from './directives/scroll-progress.directive';
import { StoriesListComponent } from './structure/stories-list/stories-list.component';
import { StoryDetailComponent } from './structure/story-detail/story-detail.component';
import { ProfileComponent } from './structure/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    StoriesListComponent,
    StoryDetailComponent,
    NavbarComponent,
    CommentEditorComponent,
    DebounceClickDirective,
    ScrollProgressDirective,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModelModule,
    IconsModule,
    AdminModule,
    PagesModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
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
