import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyreportsComponent } from './weeklyreports.component';

describe('WeeklyreportsComponent', () => {
  let component: WeeklyreportsComponent;
  let fixture: ComponentFixture<WeeklyreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
