import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictPastyearMonthydistRainComponent } from './district-pastyear-monthydist-rain.component';

describe('DistrictPastyearMonthydistRainComponent', () => {
  let component: DistrictPastyearMonthydistRainComponent;
  let fixture: ComponentFixture<DistrictPastyearMonthydistRainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictPastyearMonthydistRainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictPastyearMonthydistRainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
