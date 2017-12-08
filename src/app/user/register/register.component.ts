import { Observable } from 'rxjs/Rx';
import { AbstractControl, FormGroup, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

function passwordValidator(length: number): ValidatorFn {
return (control: AbstractControl): { [key: string]: any } => {
  return control.value.length < length ? {
    'passwordTooShort':
      { requiredLength: length, actualLength: control.value.length }
  } : null;
};
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
const password = control.get('password');
const confirmPassword = control.get('confirmPassword');
return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticationService]
})
export class RegisterComponent implements OnInit {

  public user: FormGroup;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordValidator(12)]],
        confirmPassword: ['', Validators.required]
      }, { validator: comparePasswords })
    });
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): 
      Observable<{ [key: string]: any }> => {
      return this.authenticationService.
        checkUserNameAvailability(control.value).map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    };
  }

}
