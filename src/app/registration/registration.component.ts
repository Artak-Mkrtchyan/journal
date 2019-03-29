import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';


import { RegistrationService } from './services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {
  error: [];
  registUserForm = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    password2: [''],
    emailFormControl: ['']
  });

  constructor(private RegistrationService: RegistrationService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
  // TODO: Use EventEmitter with form value
    console.warn(this.registUserForm.value);
  }

  RegistrationUser(name: string, email: string, password: string, password2: string) {
    console.log(name, email, password, password2);

    if (password === password2) {
      // this.error.push('Confirm password correct')
    }

    if (!name) {
      // this.error.push('Please enter a name')
    }

    if (!email) {
      // this.error.push('Please enter a email')
    }

    if(password != password2){
      // this.error.push('Passwords do not match');
    }

    if(password.length < 4){
      // this.error.push('Password must be at least 4 characters');
    }

    // this.RegistrationService.registUser(name, email, password).subscribe(data => {
    //   console.log(data, 'data')
    //   this.error.push(data.error);
    // });
  }
}
