import { TestBed, inject } from '@angular/core/testing';

import { VenueDataService } from './venue-data.service';

describe('VenueDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenueDataService]
    });
  });

  it('should be created', inject([VenueDataService], (service: VenueDataService) => {
    expect(service).toBeTruthy();
  }));
});
