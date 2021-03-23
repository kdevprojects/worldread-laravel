import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Repository } from './repository.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  constructor(private repo: Repository, private router: Router) {}
  authenticated: boolean = false;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  callbackUrl: string;

  register(): Observable<boolean> {
    return this.repo
      .register(this.name, this.email, this.password, this.confirmPassword)
      .pipe(
        map((response) => {
          if (response) {
            this.password = null;
            this.router.navigateByUrl(this.callbackUrl || '/members/login');
          }
          return false;
        }),
        catchError((e) => {
          this.authenticated = false;
          return of(false);
        })
      );
  }
  login(): Observable<boolean> {
    this.authenticated = false;
    return this.repo.login(this.name, this.password).pipe(
      map((response) => {
        if (response) {
          this.authenticated = true;
          this.password = null;
          this.router.navigateByUrl(this.callbackUrl || '/members/overview');
        }
        return this.authenticated;
      }),
      catchError((e) => {
        this.authenticated = false;
        return of(false);
      })
    );
  }
  logout() {
    this.authenticated = false;
    this.repo.logout();
    this.router.navigateByUrl('/members/login');
  }
}
