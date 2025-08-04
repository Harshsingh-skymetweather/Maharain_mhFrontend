import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclePercentageSelectedMonthComponent } from './circle-percentage-selected-month.component';

describe('CirclePercentageSelectedMonthComponent', () => {
  let component: CirclePercentageSelectedMonthComponent;
  let fixture: ComponentFixture<CirclePercentageSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirclePercentageSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclePercentageSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
