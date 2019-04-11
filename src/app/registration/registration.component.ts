import { Component, OnInit } from '@angular/core';

import { RegistrationService } from './services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {
  error: [];

  typeForm: string = "Registration";

  Form: object = {
    name : 'Name',
    email : 'Email',
    password : 'Password',
    password2: 'Confirm password'
  }

  linkAttr: object = {
    actionLink: 'user/registration',
    link: 'user/login',
    linkName: 'Login'
  }

  constructor() { }

  ngOnInit() {
  }
}
