import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleCountSelectedMonthComponent } from './circle-count-selected-month.component';

describe('CircleCountSelectedMonthComponent', () => {
  let component: CircleCountSelectedMonthComponent;
  let fixture: ComponentFixture<CircleCountSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleCountSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleCountSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
