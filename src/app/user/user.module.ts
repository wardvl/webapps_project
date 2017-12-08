import {HttpModule} from '@angular/http';
import { AuthGuardService } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', canActivate: [ AuthGuardService ], component: RegisterComponent }
]

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserComponent, LoginComponent, RegisterComponent, LogoutComponent]
})
export class UserModule { }
