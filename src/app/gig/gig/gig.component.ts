import { Gig } from '../gig.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gig',
  templateUrl: './gig.component.html',
  styleUrls: ['./gig.component.css']
})
export class GigComponent implements OnInit {

  @Input() public gig: Gig;
  @Output() public deleteGig = new EventEmitter<Gig>();

  constructor() { }

  ngOnInit() {
  }

  removeGig() {
    this.deleteGig.emit(this.gig)
  }

}
