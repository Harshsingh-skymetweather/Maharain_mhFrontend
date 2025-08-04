import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictProgressiveComponent } from './district-progressive.component';

describe('DistrictProgressiveComponent', () => {
  let component: DistrictProgressiveComponent;
  let fixture: ComponentFixture<DistrictProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictProgressiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
