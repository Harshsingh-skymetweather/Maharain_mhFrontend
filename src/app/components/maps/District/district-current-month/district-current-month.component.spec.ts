import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictCurrentMonthComponent } from './district-current-month.component';

describe('DistrictCurrentMonthComponent', () => {
  let component: DistrictCurrentMonthComponent;
  let fixture: ComponentFixture<DistrictCurrentMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictCurrentMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictCurrentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
