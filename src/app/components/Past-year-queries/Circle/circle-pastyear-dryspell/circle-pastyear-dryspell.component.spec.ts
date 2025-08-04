import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclePastyearDryspellComponent } from './circle-pastyear-dryspell.component';

describe('CirclePastyearDryspellComponent', () => {
  let component: CirclePastyearDryspellComponent;
  let fixture: ComponentFixture<CirclePastyearDryspellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirclePastyearDryspellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclePastyearDryspellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
