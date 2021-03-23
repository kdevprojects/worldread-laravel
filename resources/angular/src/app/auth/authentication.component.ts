import { AuthenticationService } from '../services/authentication.service';
import { Component } from '@angular/core';
@Component({
  templateUrl: 'authentication.component.html',
})
export class AuthenticationComponent {
  constructor(public authService: AuthenticationService) {}
  showError: boolean = false;
  login() {
    this.showError = false;
    this.authService.login().subscribe((result) => {
      this.showError = !result;
    });
  }
}
