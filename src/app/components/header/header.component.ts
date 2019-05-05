import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface IUser {
  id?: string;
  name: string;
  password: string;
  token?: string;
}

import { UserService } from '@service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: boolean;
  isUserLogin: boolean;

  constructor(private userService: UserService, private router: Router) { }

  toUrl(url: string) {
    this.router.navigate([url]);
  }

  logout() {
    this.userService.logout();
  }

  ngOnInit() {
    this.userService.getAuthState().subscribe(value => {
      this.isUserLogin = value;
    });
  }
}
