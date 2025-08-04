import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionPastyearHeavyrainfallcountComponent } from './division-pastyear-heavyrainfallcount.component';

describe('DivisionPastyearHeavyrainfallcountComponent', () => {
  let component: DivisionPastyearHeavyrainfallcountComponent;
  let fixture: ComponentFixture<DivisionPastyearHeavyrainfallcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionPastyearHeavyrainfallcountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionPastyearHeavyrainfallcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
