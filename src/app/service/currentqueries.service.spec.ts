import { TestBed } from '@angular/core/testing';

import { CurrentqueriesService } from './currentqueries.service';

describe('CurrentqueriesService', () => {
  let service: CurrentqueriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentqueriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
