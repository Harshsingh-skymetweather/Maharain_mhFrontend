import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictPastyearHeavyrainfallComponent } from './district-pastyear-heavyrainfall.component';

describe('DistrictPastyearHeavyrainfallComponent', () => {
  let component: DistrictPastyearHeavyrainfallComponent;
  let fixture: ComponentFixture<DistrictPastyearHeavyrainfallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictPastyearHeavyrainfallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictPastyearHeavyrainfallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
