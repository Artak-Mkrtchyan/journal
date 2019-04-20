import { Component, OnInit } from '@angular/core';

import { UserService } from '@service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  error: string;
  typeForm = 'Login';

  Form: object = {
    email : 'Email',
    password : 'Password'
  };

  linkAttr: object = {
    actionLink: 'user/login',
    link: 'user/registration',
    linkName: 'Registration'
  };

  constructor() {}

  ngOnInit() {
  }

}
