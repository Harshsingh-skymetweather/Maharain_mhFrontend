import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPacketCountComponent } from './data-packet-count.component';

describe('DataPacketCountComponent', () => {
  let component: DataPacketCountComponent;
  let fixture: ComponentFixture<DataPacketCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPacketCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPacketCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
