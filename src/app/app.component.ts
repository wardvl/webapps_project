import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './user/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  date = new Date();

  constructor(private auth: AuthenticationService) {}

  get currentUser(): Observable<String> {
    console.log(this.auth.user$)
    return this.auth.user$
  }
}
