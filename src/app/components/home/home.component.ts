import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, catchError } from 'rxjs/operators';

import { UserService } from '@service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  articles: object;

  constructor(private http: HttpClient,  private router: Router, private userService: UserService) { }

  ngOnChanges() {}

  ngOnInit() {
    // return this.http.post('', {})
    //   .pipe(
    //     map(data => {
    //       this.articles = data.article;
    //     }),
    //     catchError(err => {
    //       return err
    //     })
    //   ).subscribe();

  }

}
