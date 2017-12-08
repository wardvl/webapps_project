import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';


function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    console.log(control.value);
    return control.value.length < 12 ? { 'passwordTooShort': { value: control.value.length } } : null;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(private authService: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      providers: [AuthenticationService]
    });
  }

  onSubmit() {
    this.authService.login(this.user.value.email, this.user.value.password).subscribe(val => {
      if (val) {
        if (this.authService.redirectUrl) {
          this.router.navigateByUrl(this.authService.redirectUrl);
          this.authService.redirectUrl = undefined;
        } else {
          this.router.navigate(['/nieuws/list']);
        }
      }
    }, err => this.errorMsg = err.json().message);
  }
}
