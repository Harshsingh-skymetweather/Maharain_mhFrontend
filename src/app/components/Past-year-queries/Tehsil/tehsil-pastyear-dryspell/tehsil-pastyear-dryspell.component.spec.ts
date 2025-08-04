import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilPastyearDryspellComponent } from './tehsil-pastyear-dryspell.component';

describe('TehsilPastyearDryspellComponent', () => {
  let component: TehsilPastyearDryspellComponent;
  let fixture: ComponentFixture<TehsilPastyearDryspellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilPastyearDryspellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilPastyearDryspellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
