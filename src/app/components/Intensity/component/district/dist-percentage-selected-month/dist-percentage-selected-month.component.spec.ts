import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistPercentageSelectedMonthComponent } from './dist-percentage-selected-month.component';

describe('DistPercentageSelectedMonthComponent', () => {
  let component: DistPercentageSelectedMonthComponent;
  let fixture: ComponentFixture<DistPercentageSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistPercentageSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistPercentageSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
