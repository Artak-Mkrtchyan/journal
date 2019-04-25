import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { SnackBarService } from './snackBar.service';
import { SetToken } from '../store/index';


interface IUser {
  name?: string;
  email: string;
  password: string;
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
    const token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFydGFrNjI5N0BnbWFpbC5jb20iLCJpYXQiOjE1NTU3MDI5NTN9.zhg8yTNesD3rBX4dqKLqQMABp2cYuFTYE5oERXwP4Q8';
    const header = new HttpHeaders({
      Authorization: token
    });

    console.log(header);
    return this.http.get('api/user/logout', {headers: header});
  }


  loginUser(user: IUser): Observable<void> {
    return this.http.post<any>('api/user/login', user).pipe(map(({userInfo, token}) => {
      console.log(userInfo, token);
      if (!userInfo) {

      }

      this.snackBar.openSnackBar('hello', 'cancel', 'snackbar-danger');
      // const { _id, name, email } = userData;

      // this.store.dispatch(new SetToken({id: _id, name, email, token}));


    }));
  }

  registerUser(user: IUser): Observable<void> {
    return this.http.post<any>('api/user/registration', user).pipe(map(({userData, token}) => {
      console.log(userData, token);

      const { _id, name, email } = userData;

      // this.store.dispatch(new SetToken({id: _id, name, email, token}));


    }));

  }

  registrationUser(name: string, email: string, password: string): Observable<{ error: string }> {
    console.log('name', name, email, password);
    return this.http.post<{redirect: boolean}>('user/registration', {name, email, password})
      .pipe(map((data: {redirect: boolean}) => {
          console.log(data);
          // return user;
          if (data.redirect) {
            this.router.navigate(['/user/login']);
          } else {
            return { error: 'Incorrect email or password'};
          }
    }));
  }

}
