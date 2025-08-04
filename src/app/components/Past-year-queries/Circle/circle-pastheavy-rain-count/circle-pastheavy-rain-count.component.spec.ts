import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclePastheavyRainCountComponent } from './circle-pastheavy-rain-count.component';

describe('CirclePastheavyRainCountComponent', () => {
  let component: CirclePastheavyRainCountComponent;
  let fixture: ComponentFixture<CirclePastheavyRainCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirclePastheavyRainCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclePastheavyRainCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
