import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictselectedmonthComponent } from './districtselectedmonth.component';

describe('DistrictselectedmonthComponent', () => {
  let component: DistrictselectedmonthComponent;
  let fixture: ComponentFixture<DistrictselectedmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictselectedmonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictselectedmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
