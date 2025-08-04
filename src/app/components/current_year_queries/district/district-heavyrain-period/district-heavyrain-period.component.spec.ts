import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictHeavyrainPeriodComponent } from './district-heavyrain-period.component';

describe('DistrictHeavyrainPeriodComponent', () => {
  let component: DistrictHeavyrainPeriodComponent;
  let fixture: ComponentFixture<DistrictHeavyrainPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictHeavyrainPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictHeavyrainPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
