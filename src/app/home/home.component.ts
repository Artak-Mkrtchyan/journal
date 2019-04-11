import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, catchError } from 'rxjs/operators';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  articles: object;

  constructor(private http: HttpClient,  private router: Router, private httpService: HttpService) { }

  ngOnChanges() {}

  getArticles() {


  }

  ngOnInit() {
    // console.log('OnInit');
    // return this.http.post('', {})
    //   .pipe(
    //     map(data => {
    //       console.log(data.article)
    //       this.articles = data.article;
    //     }),
    //     catchError(err => {
    //       console.log(err);
    //       return err
    //     })
    //   ).subscribe();

  }

}
