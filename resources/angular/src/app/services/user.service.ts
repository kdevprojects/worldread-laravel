import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn$ = new BehaviorSubject<any>(null);
  private currentUserSubject$ = new BehaviorSubject<User>(null);
  public currentUser: User;
  constructor(private http: HttpClient, private router: Router) {}

  login(token: any): void {
    console.log('logging in...');
    localStorage.setItem('token', token);
    this.reloadUserData();
    this.router.navigateByUrl('/members/overview');
  }

  logout(): void {
    console.log('logging out...');
    localStorage.removeItem('token');
    this.currentUserSubject$.next(null);
    this.loggedIn$.next(false);
  }

  isUserLoggedIn(): boolean {
    return this.loggedIn$.getValue();
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUserSubject$.asObservable();
  }

  public reloadUserData(): void {
    this.http.get('/api/user').subscribe(
      (result) => {
        this.currentUserSubject$.next(result);
        this.currentUserSubject$.subscribe((u) => (this.currentUser = u));
      },
      (error) => {
        this.logout();
      }
    );
    this.loggedIn$.next(true);
  }
}
