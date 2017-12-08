import { AuthGuardService } from '../user/auth-guard.service';
import { UserModule } from '../user/user.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { AuthenticationService } from '../user/authentication.service';

const routes = [
  { path: 'list', component: NewsListComponent },
  { path: 'add', canActivate: [ AuthGuardService ], component: AddNewsComponent },
  { path: 'detail/:id', component: NewsDetailComponent}
]

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    NewsComponent,
    AddNewsComponent,
    NewsListComponent,
    NewsDetailComponent
  ],
  providers: [AuthenticationService, AuthGuardService]
})
export class NewsModule { }
