import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateperiodicComponent } from './stateperiodic.component';

describe('StateperiodicComponent', () => {
  let component: StateperiodicComponent;
  let fixture: ComponentFixture<StateperiodicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateperiodicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateperiodicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
