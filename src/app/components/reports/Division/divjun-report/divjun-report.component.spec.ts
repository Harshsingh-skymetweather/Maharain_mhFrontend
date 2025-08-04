import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivjunReportComponent } from './divjun-report.component';

describe('DivjunReportComponent', () => {
  let component: DivjunReportComponent;
  let fixture: ComponentFixture<DivjunReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivjunReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivjunReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
