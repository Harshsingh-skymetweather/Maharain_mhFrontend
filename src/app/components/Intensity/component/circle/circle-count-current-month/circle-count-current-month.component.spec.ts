import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleCountCurrentMonthComponent } from './circle-count-current-month.component';

describe('CircleCountCurrentMonthComponent', () => {
  let component: CircleCountCurrentMonthComponent;
  let fixture: ComponentFixture<CircleCountCurrentMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleCountCurrentMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleCountCurrentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
