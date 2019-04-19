import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { SetToken } from './store/index';

interface IUser {
  email: string;
  password: string;
}

@Injectable()
export class HttpService {

  data: any;


  constructor(private http: HttpClient, private router: Router, private store: Store<({ userAuth })>) { }

  // getData() : Observable<{ data: any }> {
  //   return this.http.get<Date>('/user/login').pipe(map((data: any) => {
  //     console.log(data);
  //     return this.data = data;
  //   }));
  // }

  logout() {
    let token = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFydGFrNjI5N0BnbWFpbC5jb20iLCJpYXQiOjE1NTU3MDI5NTN9.zhg8yTNesD3rBX4dqKLqQMABp2cYuFTYE5oERXwP4Q8";
    let header = new HttpHeaders({
      'Authorization': token
    });

    console.log(header);
    return this.http.get('api/user/logout', {headers: header});
  }

  getData(user: IUser, action: string): Observable<{ error: string }> {
    console.log('user', user);
    return this.http.post<{redirect: string}>("api/" + action, user).pipe(map((user: {redirect: string, error: string}) => {
      console.log(user);

      let { id, name, email, token } = user;

      this.store.dispatch(new SetToken({id: id, name: name, email: email, token: token}));
      // return user;
      // if (data.redirect) {
        // this.router.navigate([data.redirect]);
      // } else {
        return { error: user.error};
      // }

    }))

  }
}
