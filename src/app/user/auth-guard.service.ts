import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean {
    if (this.auth.user$.getValue()) {
      return true;
    }
    this.auth.redirectUrl = state.url;
    this.router.navigate(['user/login']);
    return false;
  }
}
