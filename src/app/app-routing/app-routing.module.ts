import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'user', loadChildren: '../user/user.module#UserModule'},
    { path: 'nieuws', loadChildren: '../news/news.module#NewsModule'},
    { path: 'optredens', loadChildren: '../gig/gig.module#GigModule'},
    { path: '', redirectTo: 'nieuws/list', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
