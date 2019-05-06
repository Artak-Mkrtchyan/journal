import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject, } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { SnackBarService } from './snackBar.service';
// import { SetUser, RemoveUser } from '../store/index';

import { selectUser } from './../store/selectors/user.selector';

import { IAppState } from '../store/state/app.state';
import { IUser } from '../models/user.interface';
import { RemoveUser, SetUser } from '../store/actions/user.actions';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuth = new BehaviorSubject<boolean>(false);

  getAuthState(): Observable<boolean> {
    if (localStorage.getItem('currentUser') !== null) {
      this.isAuth.next(true);
    }
    return this.isAuth.asObservable();
  }

  getCurrentAuth() {
    return this.isAuth.getValue();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<IAppState>,
    private snackBar: SnackBarService
  ) { }

  logout() {
    this.store.dispatch(new RemoveUser());
    localStorage.removeItem('currentUser');
    this.isAuth.next(false);
    this.router.navigate(['user/login']);
  }

  currentUserToken(): IUser {
    let userInfo;
    this.store.select(selectUser).subscribe(user => {
      userInfo = user;
    });
    const token = localStorage.getItem('currentUser');
    return { ...userInfo, token};
  }

  loginUser(user: IUser): Observable<void> {
    return this.http.post<any>('api/user/login', user).pipe(map(({userInfo, info}) => {
      if (!userInfo) {
        this.snackBar.openSnackBar(info.message, '', 'snackbar-danger');
        return;
      }

      const { id, name, email, token } = userInfo;
      this.store.dispatch(new SetUser({ id, name, email }));
      localStorage.setItem('currentUser', token);
      this.isAuth.next(true);
      this.snackBar.openSnackBar('Success authorization', 'OK', 'snackbar-success');
      this.router.navigate(['user/profile']);
    }));
  }

  registerUser(user: IUser): Observable<void> {
    return this.http.post<any>('api/user/registration', user).pipe(map((isRegistered) => {
      if (isRegistered) {
        this.snackBar.openSnackBar('You have registered successfully', 'Cancel', 'snackbar-success');
        this.router.navigate(['user/login']);
      } else {
        this.snackBar.openSnackBar('The email address is already in use by another account', 'Cancel', 'snackbar-danger');
      }
    }));
  }

  refreshToken(): Observable<IUser> {
    const token = localStorage.getItem('currentUser');
    this.isAuth.next(true);
    return this.http.post<IUser>('api/user/refresh', {token})
      .pipe(
        map(userInfo => {
          const { id, name, email } = userInfo;

          if (userInfo && userInfo.token) {
            this.store.dispatch(new SetUser({ id, name, email }));
          }

          return userInfo as IUser;
      }));
  }
}
