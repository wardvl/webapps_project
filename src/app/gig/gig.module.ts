import { AuthGuardService } from '../user/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GigComponent } from './gig/gig.component';
import { AddGigComponent } from './add-gig/add-gig.component';
import { GigListComponent } from './gig-list/gig-list.component';
import { GigDetailComponent } from './gig-detail/gig-detail.component';

const routes = [
  { path: 'list', component: GigListComponent },
  { path: 'add', canActivate: [ AuthGuardService ], component: AddGigComponent },
  { path: 'detail/:id', component: GigDetailComponent}
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GigComponent,
    AddGigComponent,
    GigListComponent,
    GigDetailComponent
  ]
})
export class GigModule { }
