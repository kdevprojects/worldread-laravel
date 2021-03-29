import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/admin/login');
      return false;
    }
  }
}
