import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilPercentageSelectedMonthComponent } from './tehsil-percentage-selected-month.component';

describe('TehsilPercentageSelectedMonthComponent', () => {
  let component: TehsilPercentageSelectedMonthComponent;
  let fixture: ComponentFixture<TehsilPercentageSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilPercentageSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilPercentageSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
