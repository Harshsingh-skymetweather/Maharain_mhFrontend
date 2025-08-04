import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastyeartehsilintensityComponent } from './pastyeartehsilintensity.component';

describe('PastyeartehsilintensityComponent', () => {
  let component: PastyeartehsilintensityComponent;
  let fixture: ComponentFixture<PastyeartehsilintensityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastyeartehsilintensityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastyeartehsilintensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
