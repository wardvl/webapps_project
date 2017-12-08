import { AuthenticationService } from '../user/authentication.service';
import { Venue } from '../venue/venue.model';
import { Gig } from './gig.model';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GigDataService {
  private _appUrl = "./API";

  constructor(private http: Http, private auth: AuthenticationService) {
  }

  get gigs(): Observable<Gig[]> {
    return this.http.get(`${this._appUrl}/gigs`)
      .map(response => response.json().map(item => Gig.fromJSON(item)))
  }

  addGig(gig: Gig): Observable<Gig> {
    return this.http.post(`${this._appUrl}/gig/venue/${gig.venue.id}`, gig, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
    .map(res => res.json())
    .map(item => Gig.fromJSON(item));
  }

  getGig(id: String): Observable<Gig> {
    return this.http.get(`${this._appUrl}/gig/${id}`)
    .map(response => response.json())
    .map(item => Gig.fromJSON(item));
  }

  updateGig(gig: Gig, venue: Venue): Observable<Gig> {
    return this.http.put(`${this._appUrl}/gig/${gig.id}/venue/${venue.id}`, gig, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
    .map(response => response.json())
    .map(item => Gig.fromJSON(item))
  }

  deleteGig(gig: Gig): Observable<Gig> {
    return this.http.delete(`${this._appUrl}/gig/${gig.id}`, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
    .map(response => response.json())
    .map(item => Gig.fromJSON(item))
  }
}
