import { AdminModule } from "./admin/admin.module";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandlerService } from "./services/error-handler.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { IconsModule } from "./icons/icons.module";
import { ModelModule } from "./models/model.module";
import { NavbarComponent } from './structure/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { StoriesListComponent } from './structure/stories-list/stories-list.component';
import { StoryDetailComponent } from './structure/story-detail/story-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    StoriesListComponent,
    StoryDetailComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModelModule,
    IconsModule,
    AdminModule,
    PagesModule,
    BrowserAnimationsModule
  ],
  providers: [ErrorHandlerService,
    { provide: HTTP_INTERCEPTORS,
    useExisting: ErrorHandlerService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
