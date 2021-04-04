import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationGuard {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/members/login');
      return false;
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/members/login');
      return false;
    }
  }
}
