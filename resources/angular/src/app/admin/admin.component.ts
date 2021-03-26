import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from '../services/error-handler.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { fadeAnimation } from '../animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [fadeAnimation], // register the animation
})
export class AdminComponent {
  private lastError: string[];
  constructor(
    errorService: ErrorHandlerService,
    public userService: UserService
  ) {
    errorService.errors.subscribe((error) => {
      this.lastError = error;
    });
  }

  ngOnInit(): void {
  }

  get error(): string[] {
    return this.lastError;
  }

  clearError() {
    this.lastError = null;
  }

  logout() {
    this.userService.logout();
  }
}
