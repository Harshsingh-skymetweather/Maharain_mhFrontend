import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilDailyrainForperiodComponent } from './tehsil-dailyrain-forperiod.component';

describe('TehsilDailyrainForperiodComponent', () => {
  let component: TehsilDailyrainForperiodComponent;
  let fixture: ComponentFixture<TehsilDailyrainForperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilDailyrainForperiodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilDailyrainForperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
