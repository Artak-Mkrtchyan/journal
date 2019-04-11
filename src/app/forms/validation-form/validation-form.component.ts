import { Component, OnInit, OnChanges , Input } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { HttpService } from '../../http.service';

interface IUser {
  name?: string,
  email: string;
  password: string;
  password2?: string;
}

const isConfirmPassword = (control: AbstractControl) => {
  let password = control.root.get('password');
  let confirmPassword = control.value;
  if (password) {
    const passValue = password.value;
    if (passValue !== confirmPassword || passValue === '') {
        return {
            isError: true
        };
    }
  }
  return null;
}

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.scss']
})
export class ValidationFormComponent implements OnInit, OnChanges {
  @Input() typeForm: string;
  @Input() validationForm: object;
  @Input() linkAttr: any;

  objectKeys = Object.keys;
  objVal = Object.values;

  pageTitle: object = {
    login: "Account Login",
    registration: "Registration"
  }

  errorsType: object = {
    name: 'minlength',
    email: 'email',
    password: 'minlength',
    password2: 'isError'
  }

  errorsMessage: object = {
    email: "Not a valid email",
    minlength: "Too short",
    isError: "Password and confirm password should match"
  }

  loginForm = {
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(4), Validators.required]],
  };

  registrationForm = {
    name: ['', [Validators.minLength(3), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(4), Validators.required]],
    password2: ['', [isConfirmPassword, Validators.required]]
  }

  form: any;
  data = <IUser>{};

  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  error: any;
  onSubmit(arr: Array<string>) {

    arr.map(controlName => {
      let control = this.form.get(controlName);
      this.data[controlName] = control.value;
    });

    if (!this.form.invalid) {
      this.httpService.getData(this.data, this.linkAttr.actionLink).subscribe(data => {
        this.error = data.error;
        console.log(data);
      });
    }
  }

  ngOnChanges() {
    this.form = this.fb.group(
      (this.typeForm === 'Login') ? this.loginForm : this.registrationForm
    );
  }

  ngOnInit() {
  }

}
