import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleDailyrainSelectedMonthComponent } from './circle-dailyrain-selected-month.component';

describe('CircleDailyrainSelectedMonthComponent', () => {
  let component: CircleDailyrainSelectedMonthComponent;
  let fixture: ComponentFixture<CircleDailyrainSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleDailyrainSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleDailyrainSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
