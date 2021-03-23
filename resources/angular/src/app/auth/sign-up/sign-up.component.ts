import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(public authService: AuthenticationService) {}
  showError: boolean = false;
  register() {
    this.showError = false;
    this.authService.register().subscribe((result) => {
      this.showError = !result;
    });
  }

}
