import { TestBed, inject } from '@angular/core/testing';

import { GigDataService } from './gig-data.service';

describe('GigDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GigDataService]
    });
  });

  it('should be created', inject([GigDataService], (service: GigDataService) => {
    expect(service).toBeTruthy();
  }));
});
