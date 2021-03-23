import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationGuard {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.authenticated) {
      return true;
    } else {
      this.authService.callbackUrl = route.url.toString();
      this.router.navigateByUrl('/members/login');
      return false;
    }
  }
}
