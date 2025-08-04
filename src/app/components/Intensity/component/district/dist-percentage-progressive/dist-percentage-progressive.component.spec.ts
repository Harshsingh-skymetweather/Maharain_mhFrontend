import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistPercentageProgressiveComponent } from './dist-percentage-progressive.component';

describe('DistPercentageProgressiveComponent', () => {
  let component: DistPercentageProgressiveComponent;
  let fixture: ComponentFixture<DistPercentageProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistPercentageProgressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistPercentageProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
