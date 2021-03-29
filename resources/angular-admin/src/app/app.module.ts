import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandlerService } from './services/error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModelModule } from './models/model.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';

@NgModule({
  declarations: [AppComponent, WelcomeAdminComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule, HttpClientModule, ModelModule],
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
