/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TehsilPastYearMonthlyTehsilRainComponent } from './tehsil-PastYear-monthlyTehsilRain.component';

describe('TehsilPastYearMonthlyTehsilRainComponent', () => {
  let component: TehsilPastYearMonthlyTehsilRainComponent;
  let fixture: ComponentFixture<TehsilPastYearMonthlyTehsilRainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TehsilPastYearMonthlyTehsilRainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilPastYearMonthlyTehsilRainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
