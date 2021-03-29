import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { fadeAnimation } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation], // register the animation
})
export class AppComponent {
  constructor(private userService: UserService) {
    //this.userService.reloadUserData();
  }
  ngOnInit(): void {}
}
