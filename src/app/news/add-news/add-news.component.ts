import {User} from '../../user/user.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { NewsDataService } from '../news-data.service';
import { Component, OnInit } from '@angular/core';
import { News } from '../news.model';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
  providers: [ NewsDataService ]
})
export class AddNewsComponent implements OnInit {
  private _news: FormGroup;

  constructor(private _newsDataService: NewsDataService, private _router: Router) { }

  ngOnInit() {
    this._news = new FormGroup({
      title: new FormControl(''),
      content: new FormControl('')
    });
  }

  onSubmit() {
    let author = new User('ward','vanlerberghe','ADMIN','password','salt','ward.vanlerberghe@ladylikemusic.be')
    author.id = "1"
    let news = new News(this._news.value.title, this._news.value.content,[author]);
    news.date = new Date();

    this._newsDataService.addNews(news).subscribe(item => 
      this._router.navigate(['nieuws/list'])
    );    
  }
}
