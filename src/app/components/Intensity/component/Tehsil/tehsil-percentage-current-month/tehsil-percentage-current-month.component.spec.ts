import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilPercentageCurrentMonthComponent } from './tehsil-percentage-current-month.component';

describe('TehsilPercentageCurrentMonthComponent', () => {
  let component: TehsilPercentageCurrentMonthComponent;
  let fixture: ComponentFixture<TehsilPercentageCurrentMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilPercentageCurrentMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilPercentageCurrentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
