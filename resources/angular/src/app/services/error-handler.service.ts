import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements HttpInterceptor {
  private errSubject = new Subject<string[]>();

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((resp: HttpErrorResponse) => {
        if (resp.error.errors) {
          this.errSubject.next([
            ...(Object.values(resp.error.errors) as string[]),
          ]);
        } else if (resp.status == 500) {
          this.errSubject.next(['An error occurred']);
        } else if (resp.status == 401) {
          this.errSubject.next(['Unauthorized action']);
        } else {
          this.errSubject.next(['An HTTP error occurred']);
        }
        return throwError(resp);
      })
    );
  }

  get errors(): Observable<string[]> {
    return this.errSubject;
  }
}
