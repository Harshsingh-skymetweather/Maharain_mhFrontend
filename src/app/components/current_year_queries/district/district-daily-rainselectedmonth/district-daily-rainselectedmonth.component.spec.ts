import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictDailyRainselectedmonthComponent } from './district-daily-rainselectedmonth.component';

describe('DistrictDailyRainselectedmonthComponent', () => {
  let component: DistrictDailyRainselectedmonthComponent;
  let fixture: ComponentFixture<DistrictDailyRainselectedmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictDailyRainselectedmonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictDailyRainselectedmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
