import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '@service/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.userService.currentUserToken();

    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Methods':
          //   'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          // 'Access-Control-Allow-Credentials': 'true',
          // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
          // 'Content-Type': 'application/json',
          // Accept: 'application/json',
          Authorization: `JWT ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
