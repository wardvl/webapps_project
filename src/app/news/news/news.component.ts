import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from '../news.model';
import { NewsDataService } from '../news-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
 @Input() public news: News;
 @Output() public deleteNews = new EventEmitter<News>();

  constructor() { }

  ngOnInit() {}

  removeNews() {
    this.deleteNews.emit(this.news);
  }

}
