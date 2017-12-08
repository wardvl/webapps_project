import { Venue } from './venue.model';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';

@Injectable()
export class VenueDataService {
  private _appUrl = "./API";
  
    constructor(private http: Http, private auth: AuthenticationService) {
    }
  
    get venues(): Observable<Venue[]> {
      return this.http.get(`${this._appUrl}/venues`)
      .map(response => response.json().map(item => Venue.fromJSON(item)))
    }

    getVenue(id: String): Observable<Venue> {
      return this.http.get(`${this._appUrl}/venue/${id}`)
      .map(response => response.json())
      .map(venue => Venue.fromJSON(venue))
    }

    addVenue(venue: Venue): Observable<Venue> {
      return this.http.post(`${this._appUrl}/venue`, venue, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
      .map(response => response.json())
      .map(venue => Venue.fromJSON(venue))
    }
}
