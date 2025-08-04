import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictPastyearDailyrainComponent } from './district-pastyear-dailyrain.component';

describe('DistrictPastyearDailyrainComponent', () => {
  let component: DistrictPastyearDailyrainComponent;
  let fixture: ComponentFixture<DistrictPastyearDailyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictPastyearDailyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictPastyearDailyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
