import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleListSelectedMonthComponent } from './circle-list-selected-month.component';

describe('CircleListSelectedMonthComponent', () => {
  let component: CircleListSelectedMonthComponent;
  let fixture: ComponentFixture<CircleListSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleListSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleListSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
