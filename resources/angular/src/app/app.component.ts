import { Component } from '@angular/core';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation] // register the animation
})
export class AppComponent {
  constructor() {}
  
  onActivate(event: Event) {
    window.scrollTo(0, 0);
  }
}
