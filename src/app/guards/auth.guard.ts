import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserService } from '@service/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private userService: UserService
  ) { }

  canActivate() {
    const currentUser = this.userService.currentUserToken();

    if (currentUser.token !== null) {
      return true;
    }

    this.router.navigate(['user/login']);
    return false;
  }
}
