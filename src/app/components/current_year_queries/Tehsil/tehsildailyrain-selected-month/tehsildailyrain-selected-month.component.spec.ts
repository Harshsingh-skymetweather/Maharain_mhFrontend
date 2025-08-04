import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsildailyrainSelectedMonthComponent } from './tehsildailyrain-selected-month.component';

describe('TehsildailyrainSelectedMonthComponent', () => {
  let component: TehsildailyrainSelectedMonthComponent;
  let fixture: ComponentFixture<TehsildailyrainSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsildailyrainSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsildailyrainSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
