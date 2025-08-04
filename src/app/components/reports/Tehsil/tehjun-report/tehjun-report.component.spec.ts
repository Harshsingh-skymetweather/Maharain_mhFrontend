import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehjunReportComponent } from './tehjun-report.component';

describe('TehjunReportComponent', () => {
  let component: TehjunReportComponent;
  let fixture: ComponentFixture<TehjunReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehjunReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehjunReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
