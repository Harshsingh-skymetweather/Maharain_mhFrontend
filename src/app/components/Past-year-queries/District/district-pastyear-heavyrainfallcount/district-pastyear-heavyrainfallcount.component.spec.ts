import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictPastyearHeavyrainfallcountComponent } from './district-pastyear-heavyrainfallcount.component';

describe('DistrictPastyearHeavyrainfallcountComponent', () => {
  let component: DistrictPastyearHeavyrainfallcountComponent;
  let fixture: ComponentFixture<DistrictPastyearHeavyrainfallcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictPastyearHeavyrainfallcountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictPastyearHeavyrainfallcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
