import { Component, OnInit, OnChanges , Input } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { UserService } from '@service/user.service';

const isConfirmPassword = (control: AbstractControl) => {
  const password = control.root.get('password');
  const confirmPassword = control.value;
  if (password) {
    const passValue = password.value;
    if (passValue !== confirmPassword || passValue === '') {
        return {
            isError: true
        };
    }
  }
  return null;
};

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {

  registrationForm = this.fb.group({
    name: ['', [Validators.minLength(3), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]],
    password2: ['', [isConfirmPassword, Validators.required]]
  });

  constructor(private fb: FormBuilder, private userService: UserService) { }

  register() {
    this.userService.registerUser(this.registrationForm.value).subscribe();
  }

  ngOnInit() {
  }
}
