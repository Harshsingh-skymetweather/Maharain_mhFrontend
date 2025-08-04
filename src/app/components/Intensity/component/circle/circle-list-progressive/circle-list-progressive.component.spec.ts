import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleListProgressiveComponent } from './circle-list-progressive.component';

describe('CircleListProgressiveComponent', () => {
  let component: CircleListProgressiveComponent;
  let fixture: ComponentFixture<CircleListProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleListProgressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleListProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
