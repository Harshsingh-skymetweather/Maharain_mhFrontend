import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainfallReportComponent } from './rainfall-report.component';

describe('RainfallReportComponent', () => {
  let component: RainfallReportComponent;
  let fixture: ComponentFixture<RainfallReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RainfallReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RainfallReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
