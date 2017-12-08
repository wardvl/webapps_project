import { NewsDataService } from '../news-data.service';
import { Component, OnInit } from '@angular/core';
import { News } from '../news.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  providers: [ NewsDataService ]
})
export class NewsListComponent implements OnInit {
  private _news : News[];

  constructor(private _newsDataService: NewsDataService) { }

  ngOnInit() {
    this._newsDataService.news.subscribe(items => this._news = items);    
  }

  get news(){
    return this._news;
  }

  deleteNews(news: News) {
    this._newsDataService.deleteNews(news).subscribe(item => 
      this._news = this._news.filter(news => item.id !== news.id)
    )
  }

}