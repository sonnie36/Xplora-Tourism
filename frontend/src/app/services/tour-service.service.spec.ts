import { TestBed } from '@angular/core/testing';

import { TourService } from './tour-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TourServiceService', () => {
  let service: TourService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
