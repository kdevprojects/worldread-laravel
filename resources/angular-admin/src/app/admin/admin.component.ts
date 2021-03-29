import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  private lastError: string[];
  public isMenuCollapsed = true;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  get error(): string[] {
    return this.lastError;
  }

  clearError() {
    this.lastError = null;
  }
  logout() {
    this.authService.logout();
  }
}
