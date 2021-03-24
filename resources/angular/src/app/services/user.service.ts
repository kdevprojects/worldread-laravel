import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn = new BehaviorSubject<any>(null);
  currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(token: any): void {
    console.log('logging in...');
    localStorage.setItem('token', token);
    console.log(localStorage.getItem('token'));
    this.http.get('/api/user').subscribe(
      (result) => {
        this.currentUserSubject.next(result);
        this.router.navigateByUrl('/members/overview');
      },
      (error) => {
        this.logout();
      }
    );
    this.loggedIn.next(true);
  }

  logout(): void {
    console.log('logging out...');
    localStorage.removeItem('token');
    this.currentUserSubject = null;
    this.loggedIn.next(false);
  }

  isUserLoggedIn(): any {
    return this.loggedIn.getValue();
  }

  public getCurrentUser(): any {
    console.log('getting user info...');
    return this.currentUserSubject.getValue();
  }
}
