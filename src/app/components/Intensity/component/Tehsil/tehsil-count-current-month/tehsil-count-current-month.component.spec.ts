import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilCountCurrentMonthComponent } from './tehsil-count-current-month.component';

describe('TehsilCountCurrentMonthComponent', () => {
  let component: TehsilCountCurrentMonthComponent;
  let fixture: ComponentFixture<TehsilCountCurrentMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilCountCurrentMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilCountCurrentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
