import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistheavyrainComponent } from './distheavyrain.component';

describe('DistheavyrainComponent', () => {
  let component: DistheavyrainComponent;
  let fixture: ComponentFixture<DistheavyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistheavyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistheavyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
