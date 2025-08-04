import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistCountSelectedMonthComponent } from './dist-count-selected-month.component';

describe('DistCountSelectedMonthComponent', () => {
  let component: DistCountSelectedMonthComponent;
  let fixture: ComponentFixture<DistCountSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistCountSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistCountSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
