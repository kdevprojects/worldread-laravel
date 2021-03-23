import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedChanged = new Subject<boolean>();
  private user: any = null;

  constructor(private http: HttpClient) {}

  login(token: any): void {
    console.log("logging in...");
    localStorage.setItem('token', token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    console.log(localStorage.getItem('token'));
    this.http.get('/api/user', { headers }).subscribe(
      (result) => (this.user = result),
      (error) => {
        this.logout();
      }
    );
    this.loggedChanged.next(true);
  }

  logout(): void {
    console.log("logging out...");
    localStorage.removeItem('token');
    this.user = null;
    this.loggedChanged.next(false);
  }

  isUserLoggedIn(): Subject<boolean> {
    return this.loggedChanged;
  }

  getUser(): any {
    console.log("getting user info...");
    return this.user;
  }
}
