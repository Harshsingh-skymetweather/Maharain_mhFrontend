import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclePercentageProgressiveComponent } from './circle-percentage-progressive.component';

describe('CirclePercentageProgressiveComponent', () => {
  let component: CirclePercentageProgressiveComponent;
  let fixture: ComponentFixture<CirclePercentageProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirclePercentageProgressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclePercentageProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
