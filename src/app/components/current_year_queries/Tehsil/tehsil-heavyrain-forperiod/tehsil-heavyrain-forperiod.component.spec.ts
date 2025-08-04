import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilHeavyrainForperiodComponent } from './tehsil-heavyrain-forperiod.component';

describe('TehsilHeavyrainForperiodComponent', () => {
  let component: TehsilHeavyrainForperiodComponent;
  let fixture: ComponentFixture<TehsilHeavyrainForperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilHeavyrainForperiodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilHeavyrainForperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
