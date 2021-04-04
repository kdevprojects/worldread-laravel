import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";

import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor {
  private errSubject = new Subject<string[]>();

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((resp: HttpErrorResponse) => {
        if (resp.error.errors) {
          this.errSubject
            .next([...Object.values(resp.error.errors) as string[]]);
        } else if (resp.error.message) {
          this.errSubject.next([resp.error.message]);
        } else {
          this.errSubject.next(["An HTTP error occurred"]);
        }
        return throwError(resp);
      })
    );
  }

  get errors(): Observable<string[]> {
    return this.errSubject;
  }
}
