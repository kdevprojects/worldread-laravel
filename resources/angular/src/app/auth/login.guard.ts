import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class LoginGuard {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.isUserLoggedIn()) {
      this.router.navigateByUrl('/members/overview');
      return false;
    } else {
      return true;
    }
  }
}
