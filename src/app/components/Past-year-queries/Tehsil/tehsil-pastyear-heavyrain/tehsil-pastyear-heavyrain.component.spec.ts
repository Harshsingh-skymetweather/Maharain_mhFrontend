import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilPastyearHeavyrainComponent } from './tehsil-pastyear-heavyrain.component';

describe('TehsilPastyearHeavyrainComponent', () => {
  let component: TehsilPastyearHeavyrainComponent;
  let fixture: ComponentFixture<TehsilPastyearHeavyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilPastyearHeavyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilPastyearHeavyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
