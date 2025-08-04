import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleCountProgressiveComponent } from './circle-count-progressive.component';

describe('CircleCountProgressiveComponent', () => {
  let component: CircleCountProgressiveComponent;
  let fixture: ComponentFixture<CircleCountProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleCountProgressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleCountProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
