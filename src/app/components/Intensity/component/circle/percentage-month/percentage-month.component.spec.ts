import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageMonthComponent } from './percentage-month.component';

describe('PercentageMonthComponent', () => {
  let component: PercentageMonthComponent;
  let fixture: ComponentFixture<PercentageMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentageMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
