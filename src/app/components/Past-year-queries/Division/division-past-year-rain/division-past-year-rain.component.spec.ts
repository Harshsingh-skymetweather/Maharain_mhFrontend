import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionPastYearRainComponent } from './division-past-year-rain.component';

describe('DivisionPastYearRainComponent', () => {
  let component: DivisionPastYearRainComponent;
  let fixture: ComponentFixture<DivisionPastYearRainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionPastYearRainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionPastYearRainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
