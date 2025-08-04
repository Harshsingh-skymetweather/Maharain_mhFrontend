import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastyearcircleintensityComponent } from './pastyearcircleintensity.component';

describe('PastyearcircleintensityComponent', () => {
  let component: PastyearcircleintensityComponent;
  let fixture: ComponentFixture<PastyearcircleintensityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastyearcircleintensityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastyearcircleintensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
