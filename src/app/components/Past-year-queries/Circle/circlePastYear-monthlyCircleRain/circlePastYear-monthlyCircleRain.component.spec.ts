/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CirclePastYearMonthlyCircleRainComponent } from './circlePastYear-monthlyCircleRain.component';

describe('CirclePastYearMonthlyCircleRainComponent', () => {
  let component: CirclePastYearMonthlyCircleRainComponent;
  let fixture: ComponentFixture<CirclePastYearMonthlyCircleRainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirclePastYearMonthlyCircleRainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclePastYearMonthlyCircleRainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
