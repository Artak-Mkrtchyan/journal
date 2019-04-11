import { Component, OnInit } from '@angular/core';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpService]
})
export class LoginComponent implements OnInit {
  error: string;
  typeForm: string = "Login";

  Form: object = {
    email : 'Email',
    password : 'Password'
  }

  linkAttr: object = {
    actionLink: 'user/login',
    link: 'user/registration',
    linkName: 'Registration'
  }

  constructor() {}

  ngOnInit() {
  }

}
