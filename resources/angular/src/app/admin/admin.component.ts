import { Component, OnInit } from '@angular/core';

import { Repository } from '../services/repository.service';
import { UserService } from '../services/user.service';
import { fadeAnimation } from '../animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [fadeAnimation], // register the animation
})
export class AdminComponent {
  public isMenuCollapsed = true;
  active = 1;
  constructor(public userService: UserService, public route: ActivatedRoute) {}

  ngOnInit(): void {

  }

  logout() {
    this.userService.logout();
  }
}
