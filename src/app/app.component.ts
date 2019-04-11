import { Component, OnInit } from '@angular/core';

import { HttpService } from './http.service';
// import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    console.log('OnInit');
  }
}
