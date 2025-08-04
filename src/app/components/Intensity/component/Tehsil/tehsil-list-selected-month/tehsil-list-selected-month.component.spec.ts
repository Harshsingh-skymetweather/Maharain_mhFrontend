import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilListSelectedMonthComponent } from './tehsil-list-selected-month.component';

describe('TehsilListSelectedMonthComponent', () => {
  let component: TehsilListSelectedMonthComponent;
  let fixture: ComponentFixture<TehsilListSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilListSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilListSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
