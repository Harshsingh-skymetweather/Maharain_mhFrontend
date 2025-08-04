import { TestBed } from '@angular/core/testing';

import { CurrentreportService } from './currentreport.service';

describe('CurrentreportService', () => {
  let service: CurrentreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
