import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionPastyearHeavyrainfallComponent } from './division-pastyear-heavyrainfall.component';

describe('DivisionPastyearHeavyrainfallComponent', () => {
  let component: DivisionPastyearHeavyrainfallComponent;
  let fixture: ComponentFixture<DivisionPastyearHeavyrainfallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionPastyearHeavyrainfallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionPastyearHeavyrainfallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
