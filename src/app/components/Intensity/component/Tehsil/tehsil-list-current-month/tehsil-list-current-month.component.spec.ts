import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilListCurrentMonthComponent } from './tehsil-list-current-month.component';

describe('TehsilListCurrentMonthComponent', () => {
  let component: TehsilListCurrentMonthComponent;
  let fixture: ComponentFixture<TehsilListCurrentMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilListCurrentMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilListCurrentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
