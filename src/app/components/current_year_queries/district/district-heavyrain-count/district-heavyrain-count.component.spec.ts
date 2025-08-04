import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictHeavyrainCountComponent } from './district-heavyrain-count.component';

describe('DistrictHeavyrainCountComponent', () => {
  let component: DistrictHeavyrainCountComponent;
  let fixture: ComponentFixture<DistrictHeavyrainCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictHeavyrainCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictHeavyrainCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
