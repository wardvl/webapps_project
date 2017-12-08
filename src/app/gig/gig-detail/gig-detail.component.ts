import { ActivatedRoute } from '@angular/router';
import { Gig } from '../gig.model';
import { Component, OnInit } from '@angular/core';
import { GigDataService } from '../gig-data.service';

@Component({
  selector: 'app-gig-detail',
  templateUrl: './gig-detail.component.html',
  styleUrls: ['./gig-detail.component.css'],
  providers: [GigDataService]
})
export class GigDetailComponent implements OnInit {
  private _gig: Gig

  constructor(private route: ActivatedRoute, private _gigDataService: GigDataService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this._gigDataService.getGig(id).subscribe(gig => this._gig = gig)
  }

  get gig() {
    return this._gig
  }

}
