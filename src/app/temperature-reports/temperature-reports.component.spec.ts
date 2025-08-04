import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureReportsComponent } from './temperature-reports.component';

describe('TemperatureReportsComponent', () => {
  let component: TemperatureReportsComponent;
  let fixture: ComponentFixture<TemperatureReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
