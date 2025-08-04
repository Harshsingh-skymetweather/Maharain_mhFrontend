import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivDailyrainSelectedMonthComponent } from './div-dailyrain-selected-month.component';

describe('DivDailyrainSelectedMonthComponent', () => {
  let component: DivDailyrainSelectedMonthComponent;
  let fixture: ComponentFixture<DivDailyrainSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivDailyrainSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivDailyrainSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
