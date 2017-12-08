import { GigDataService } from '../gig-data.service';
import { Gig } from '../gig.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gig-list',
  templateUrl: './gig-list.component.html',
  styleUrls: ['./gig-list.component.css'],
  providers: [ GigDataService ]
})
export class GigListComponent implements OnInit {

  private _gigs: Gig[];

  constructor(private _gigDataService: GigDataService) { }

  ngOnInit() {
    this._gigDataService.gigs.subscribe(gigs => this._gigs = gigs)
  }

  get gigs() {
    return this._gigs
  }

  deleteGig(gig: Gig) {
    this._gigDataService.deleteGig(gig).subscribe(gig => 
      this._gigs = this._gigs.filter(item => gig.id !== item.id)
    )
  }
}
