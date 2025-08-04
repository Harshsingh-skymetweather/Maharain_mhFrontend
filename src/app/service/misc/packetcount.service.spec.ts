import { TestBed } from '@angular/core/testing';

import { PacketcountService } from './packetcount.service';

describe('PacketcountService', () => {
  let service: PacketcountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacketcountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
