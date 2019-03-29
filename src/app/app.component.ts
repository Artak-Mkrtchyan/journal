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
  title = 'journal';

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    console.log('OnInit');
    // this.httpService.getData().subscribe(data => console.log(data, 'data'));
  }
}
