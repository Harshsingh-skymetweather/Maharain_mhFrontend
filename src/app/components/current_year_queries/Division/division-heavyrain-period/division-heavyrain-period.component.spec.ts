import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionHeavyrainPeriodComponent } from './division-heavyrain-period.component';

describe('DivisionHeavyrainPeriodComponent', () => {
  let component: DivisionHeavyrainPeriodComponent;
  let fixture: ComponentFixture<DivisionHeavyrainPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionHeavyrainPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionHeavyrainPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
