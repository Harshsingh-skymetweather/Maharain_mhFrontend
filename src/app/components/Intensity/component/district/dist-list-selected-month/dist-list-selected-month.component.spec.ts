import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistListSelectedMonthComponent } from './dist-list-selected-month.component';

describe('DistListSelectedMonthComponent', () => {
  let component: DistListSelectedMonthComponent;
  let fixture: ComponentFixture<DistListSelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistListSelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistListSelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
