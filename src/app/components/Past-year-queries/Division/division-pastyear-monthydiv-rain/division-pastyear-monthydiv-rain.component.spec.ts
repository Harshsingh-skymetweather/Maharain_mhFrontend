import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionPastyearMonthydivRainComponent } from './division-pastyear-monthydiv-rain.component';

describe('DivisionPastyearMonthydivRainComponent', () => {
  let component: DivisionPastyearMonthydivRainComponent;
  let fixture: ComponentFixture<DivisionPastyearMonthydivRainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionPastyearMonthydivRainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionPastyearMonthydivRainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
