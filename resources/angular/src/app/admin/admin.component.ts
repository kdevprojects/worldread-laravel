import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { fadeAnimation } from '../animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [fadeAnimation], // register the animation
})
export class AdminComponent {
  public isMenuCollapsed = true;

  constructor(
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }
}
