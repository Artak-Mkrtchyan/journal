import { Component, OnInit } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface IUser {
  id?: string;
  name: string;
  password: string;
  token?: string;
}

import { UserService } from '@service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: boolean;
  isUserLogin: boolean;

  constructor(private userService: UserService, private router: Router) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  toUrl(url: string) {
    this.router.navigate([url]);
  }

  logout() {
    this.userService.logout();
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentAuth();
    this.userService.getAuthState().subscribe(value => {
      this.isUserLogin = value;
    });

    if (this.userService.getCurrentAuth() === true) {
      this.userService.refreshToken().subscribe();
    }

  }
}
