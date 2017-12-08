import { News } from '../news.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { NewsDataService } from '../news-data.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
  providers: [NewsDataService]
})
export class NewsDetailComponent implements OnInit {
  private _news: News;

  constructor(private route: ActivatedRoute, private _newsDataService: NewsDataService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this._newsDataService.getNews(id).subscribe(item => this._news = item);
  }

  get news(){
    return this._news;
  }

}
