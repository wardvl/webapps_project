import { User } from './user.model';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {
  private _url = '/API'
  private _user$: BehaviorSubject<String>;
  public redirectUrl: string;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this._user$ = new BehaviorSubject<String>(
      currentUser && currentUser.email
    )
  }

  get user$(): BehaviorSubject<String> {
    return this._user$;
  }

  get token(): string {
    const localCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    return !!localCurrentUser ? localCurrentUser.token : '';
  }

  login(email: String, password: String): Observable<boolean> {
    return this.http.post(`${this._url}/login`, { email: email, password: password })
      .map(res => res.json())
      .map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser',
            JSON.stringify({ email: email, token: token }));
          this._user$.next(email);
          return true;
        } else {
          return false;
        }
      });
  }

  register(user: User): Observable<boolean> {
    return this.http.post(`${this._url}/register`, user)
      .map(res => res.json())
      .map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser',
            JSON.stringify({ email: user.email, token: res.token }));
          this._user$.next(user.email);
          return true;
        } else {
          return false;
        }
      });
  }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem('currentUser');
      setTimeout(() => this._user$.next(null));
    }
  }

  checkUserNameAvailability(email: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkusername`, { email: email })
      .map(res => res.json())
      .map(item => {
        if (item.email === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      });
  }

}
