import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicrleDailyrainPeriodComponent } from './cicrle-dailyrain-period.component';

describe('CicrleDailyrainPeriodComponent', () => {
  let component: CicrleDailyrainPeriodComponent;
  let fixture: ComponentFixture<CicrleDailyrainPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CicrleDailyrainPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CicrleDailyrainPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
