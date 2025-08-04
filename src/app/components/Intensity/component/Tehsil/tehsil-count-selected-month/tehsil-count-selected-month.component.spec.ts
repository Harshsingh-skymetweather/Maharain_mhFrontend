import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilCountSelectedMonthComponent } from './tehsil-count-selected-month.component';

describe('TehsilCountSelectedMonthComponent', () => {
  let component: TehsilCountSelectedMonthComponent;
  let fixture: ComponentFixture<TehsilCountSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilCountSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilCountSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
