import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

  // user: User;

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      const privileges = route.data.roles;

      console.log(privileges);

      if (privileges != null) {

        // this.user = this.auth.getUser();
        // const roles = this.user.roles;
        const roles = this.auth.getUserRol();
        console.log(roles);

        const privileg = privileges.filter((rol: string) =>
          rol === roles
        ).length > 0;

        if (privileg) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      } else {
        return true;
      }
    }

    // return true;
  }
}
