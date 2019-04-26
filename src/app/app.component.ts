import { Component, OnInit } from '@angular/core';

import { UserService } from '@service/user.service';
// import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }
}
