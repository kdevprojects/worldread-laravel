import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { Repository } from '../services/repository.service';
import { Story } from '../models/story.model';
import { fadeAnimation } from '../animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [fadeAnimation] // register the animation
})
export class AdminComponent {
  private lastError: string[];
  constructor(
    private repo: Repository,
    public authService: AuthenticationService,
    errorService: ErrorHandlerService
  ) {
    errorService.errors.subscribe((error) => {
      this.lastError = error;
    });
  }

  get error(): string[] {
    return this.lastError;
  }
  clearError() {
    this.lastError = null;
  }
}
