import { Component, OnInit } from '@angular/core';

import { UserService } from '@service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAuthState().subscribe();

    if (this.userService.getCurrentAuth() === true) {
      this.userService.refreshToken().subscribe();
    }
  }
}
