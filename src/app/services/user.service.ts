import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { SnackBarService } from './snackBar.service';
import { SetUser, RemoveUser } from '../store/index';


interface IUser {
  id?: number;
  name: string;
  password: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<({ userAuth })>,
    private snackBar: SnackBarService
  ) { }

  logout() {
    this.store.dispatch(new RemoveUser());
    this.router.navigate(['user/login']);
  }

  public get currentUserToken(): IUser {
    let userInfo: IUser;
    this.store.select('userAuth').subscribe(user => {
      userInfo = user;
    });
    const token = localStorage.getItem('currentUser');
    return { ...userInfo, token};
  }


  loginUser(user: IUser): Observable<void> {
    return this.http.post<any>('api/user/login', user).pipe(map(({userInfo, token, info}) => {
      if (!userInfo) {
        this.snackBar.openSnackBar(info.message, '', 'snackbar-danger');
        return;
      }

      const { _id, name, email } = userInfo;
      this.store.dispatch(new SetUser({ id: _id, name, email }));
      localStorage.setItem('currentUser', token);
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
}
