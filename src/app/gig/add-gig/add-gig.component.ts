import { VenueDataService } from '../../venue/venue-data.service';
import { Venue } from '../../venue/venue.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GigDataService } from '../gig-data.service';
import { Component, OnInit } from '@angular/core';
import { Gig } from '../gig.model';

@Component({
  selector: 'app-add-gig',
  templateUrl: './add-gig.component.html',
  styleUrls: ['./add-gig.component.css'],
  providers: [GigDataService, VenueDataService]
})
export class AddGigComponent implements OnInit {
  public _gig: FormGroup
  private _venue: FormGroup
  private _venues: Venue[]
  private _isAddVenue: boolean

  constructor(private fb: FormBuilder,private _gigDataService: GigDataService, private _router: Router, private _venueDataService: VenueDataService) { }

  ngOnInit() {
    this._gig = this.fb.group({
      description:['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required],
      venue: ['', Validators.required]
    })
    this._venueDataService.venues.subscribe(venues => this._venues = venues)
    this._isAddVenue = false
  }

  get venues(){
    return this._venues
  }

  get isAddVenue() {
    return this._isAddVenue
  }

  onSubmit() {
    let gig: Gig
    this._venueDataService.getVenue(this._gig.value.venue).subscribe(item => {
      gig = new Gig(this._gig.value.description, item, this._gig.value.date)
      this._gigDataService.addGig(gig).subscribe(res => this._router.navigate(['optredens/list']))       
    })     
  }

  onSubmitVenue() {
    this._isAddVenue = false
    let venue = new Venue(this._venue.value.name, this._venue.value.address_street, this._venue.value.address_number, this._venue.value.address_city, this._venue.value.address_postalcode, this._venue.value.telephone)
    this._venueDataService.addVenue(venue).subscribe(item => {this._venues.push(item); console.log(item)})
  }

  addVenue() {
    this._isAddVenue = true
    this._venue = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        address_street: [''],
        address_number: [''],
        address_city: ['', [Validators.required, Validators.minLength(2)]],
        address_postalcode: [''],
        telephone: ['']
    })
  }

  cancelAddVenue() {
    this._isAddVenue = false
  }

}
