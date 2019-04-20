import { Component, OnInit } from '@angular/core';

import { UserService } from '@service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {
  error: [];

  typeForm = 'Registration';

  Form: object = {
    name : 'Name',
    email : 'Email',
    password : 'Password',
    password2: 'Confirm password'
  };

  linkAttr: object = {
    actionLink: 'user/registration',
    link: 'user/login',
    linkName: 'Login'
  };

  constructor() { }

  ngOnInit() {
  }
}
