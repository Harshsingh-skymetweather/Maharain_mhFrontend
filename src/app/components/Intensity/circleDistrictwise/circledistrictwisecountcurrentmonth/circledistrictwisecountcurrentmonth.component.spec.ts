import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircledistrictwisecountcurrentmonthComponent } from './circledistrictwisecountcurrentmonth.component';

describe('CircledistrictwisecountcurrentmonthComponent', () => {
  let component: CircledistrictwisecountcurrentmonthComponent;
  let fixture: ComponentFixture<CircledistrictwisecountcurrentmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircledistrictwisecountcurrentmonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircledistrictwisecountcurrentmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
