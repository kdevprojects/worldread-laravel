import { Component } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';
import { ToastService } from './services/toast.service';
import { UserService } from './services/user.service';
import { fadeAnimation } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation], // register the animation
})
export class AppComponent {
  private lastError: string[];

  constructor(
    private userService: UserService,
    private errorService: ErrorHandlerService,
    private toastService: ToastService
  ) {
    this.userService.reloadUserData();
    this.errorService.errors.subscribe((error) => {
      this.lastError = error;
      this.lastError.forEach((e) => {
        this.showDangerToast(e);
      });
    });
  }
  ngOnInit(): void {}
  get error(): string[] {
    return this.lastError;
  }

  clearError() {
    this.lastError = null;
  }

  showDangerToast(message: string) {
    this.toastService.show(message, {
      classname: 'bg-danger text-light',
      delay: 5000,
    });
  }
}
