import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictPastyearDryspellComponent } from './district-pastyear-dryspell.component';

describe('DistrictPastyearDryspellComponent', () => {
  let component: DistrictPastyearDryspellComponent;
  let fixture: ComponentFixture<DistrictPastyearDryspellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictPastyearDryspellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictPastyearDryspellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
