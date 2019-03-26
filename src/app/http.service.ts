import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {

  data: any;


  constructor(private http: HttpClient) { }

  // getData() : Observable<{ data: any }> {
  //   return this.http.get<Date>('/user/login').pipe(map((data: any) => {
  //     console.log(data);
  //     return this.data = data;
  //   }));
  // }
  getData() {
    let body = { email: 'artakk6297@gmail.com', password: '1234'};
    return this.http.post('user/login', body);
  }
}
