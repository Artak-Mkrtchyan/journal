import { Component, OnInit, OnChanges , Input } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { UserService } from '@service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]]
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  login() {
    this.userService.loginUser(this.loginForm.value).subscribe(data => {

      console.log(data);
    });
  }

  ngOnInit() {
  }

}
