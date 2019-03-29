import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpService]
})
export class LoginComponent implements OnInit {
  error: string;

  loginUserForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private httpService: HttpService, private fb: FormBuilder) {}

  ngOnInit() {
    console.log('OnInit');
    // this.httpService.getData().subscribe(data => console.log(data, 'data'));

  }

  loginUser(email, password) {

    this.httpService.getData({email, password}).subscribe(data => {
      console.log(data, 'data')
      this.error = data.error;
    });
  }

}
