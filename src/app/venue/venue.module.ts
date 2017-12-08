import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueComponent } from './venue/venue.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { AddVenueComponent } from './add-venue/add-venue.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VenueComponent, VenueListComponent, AddVenueComponent, VenueDetailComponent]
})
export class VenueModule { }
