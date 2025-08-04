import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionPastyearDryspellComponent } from './division-pastyear-dryspell.component';

describe('DivisionPastyearDryspellComponent', () => {
  let component: DivisionPastyearDryspellComponent;
  let fixture: ComponentFixture<DivisionPastyearDryspellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionPastyearDryspellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionPastyearDryspellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
