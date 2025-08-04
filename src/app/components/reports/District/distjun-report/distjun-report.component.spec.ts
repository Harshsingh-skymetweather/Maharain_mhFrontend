import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistjunReportComponent } from './distjun-report.component';

describe('DistjunReportComponent', () => {
  let component: DistjunReportComponent;
  let fixture: ComponentFixture<DistjunReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistjunReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistjunReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
