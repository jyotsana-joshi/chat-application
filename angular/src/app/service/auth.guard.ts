import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(public router: Router, private authService: AuthService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authService.isLoggedIn;
    if (currentUser) {
        // logged in so return true
        return true;
    }
      window.alert('Access Denied, Login is Required to Access This Page!');
      this.router.navigate(['login']);
  
    return false;
  }
}