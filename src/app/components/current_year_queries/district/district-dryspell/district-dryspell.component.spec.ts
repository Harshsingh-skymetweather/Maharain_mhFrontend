import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictDryspellComponent } from './district-dryspell.component';

describe('DistrictDryspellComponent', () => {
  let component: DistrictDryspellComponent;
  let fixture: ComponentFixture<DistrictDryspellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictDryspellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictDryspellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
