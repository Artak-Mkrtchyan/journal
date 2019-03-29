import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface IUser {
  email: string;
  password: string;
}

@Injectable()
export class HttpService {

  data: any;


  constructor(private http: HttpClient, private router: Router) { }

  // getData() : Observable<{ data: any }> {
  //   return this.http.get<Date>('/user/login').pipe(map((data: any) => {
  //     console.log(data);
  //     return this.data = data;
  //   }));
  // }
  getData(user: IUser): Observable<{ error: string }> {
    console.log('user', user);
    return this.http.post<{redirect: boolean}>('user/login', user).pipe(map((data: {redirect: boolean}) => {
      console.log(data);
      // return user;
      if (data.redirect) {
        this.router.navigate(['/']);
      } else {
        return { error: 'Incorrect email or password'};
      }

    }))

  }
}
