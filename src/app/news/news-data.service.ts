import { User } from '../user/user.model';
import { Injectable } from '@angular/core';
import { News } from './news.model';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../user/authentication.service';

@Injectable()
export class NewsDataService {
  private _appUrl = "./API";

  constructor(private http: Http, private auth: AuthenticationService) {
  }

  get news(): Observable<News[]> {
    return this.http.get(`${this._appUrl}/news`)
    .map(response => response.json().map(item => News.fromJSON(item)))
  }

  addNews(news: News): Observable<News> {
    return this.http.post(`${this._appUrl}/news/author/${news.authors.reduce(user => user).id}`, news, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
    .map(res => res.json())
    .map(item => News.fromJSON(item));
  }

  getNews(id: String) : Observable<News> {
    return this.http.get(`${this._appUrl}/news/${id}`)
    .map(response => response.json())
    .map(item => News.fromJSON(item));
  }

  updateNews(news: News, author: User) : Observable<News> {
    return this.http.put(`${this._appUrl}/news/${news.id}/author/${author.id}`, news, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
    .map(response => response.json())
    .map(item => News.fromJSON(item))
  }

  deleteNews(news: News) : Observable<News> {
    return this.http.delete(`${this._appUrl}/news/${news.id}`, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
    .map(response => response.json())
    .map(item => News.fromJSON(item))
  }
}
