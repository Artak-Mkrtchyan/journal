import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from '@service/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const currentUser = this.userService.currentUserToken;
        console.log(currentUser);
        if (currentUser.token !== '') {
            return true;
        }

        this.router.navigate(['user/login']);
        return false;
    }
}
