import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainfallheavycountComponent } from './rainfallheavycount.component';

describe('RainfallheavycountComponent', () => {
  let component: RainfallheavycountComponent;
  let fixture: ComponentFixture<RainfallheavycountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RainfallheavycountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RainfallheavycountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
