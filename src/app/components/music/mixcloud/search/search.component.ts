import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mixcloud-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(
    private http: HttpClient, 
    // private route: Router
  ) {}

  ngOnInit() {
    // const headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Origin', '*');

    // headers.append(
    //   'Access-Control-Allow-Methods',
    //   'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    // );
    // headers.append(
    //   'Access-Control-Allow-Headers',
    //   'Origin, Content-Type, X-Auth-Token'
    // );

    // headers.append(
    //   'Content-Type',
    //   'application/json' /*or whatever type is relevant */
    // );

    // headers.append('Accept', 'application/json');

    // headers.append('Access-Control-Allow-Credentials', 'true');

    this.http
      .get('https://api.mixcloud.com/search/?q=eminem&type=cloudcast')
      .subscribe(info => {
        console.log(info);
      });
  }
}
