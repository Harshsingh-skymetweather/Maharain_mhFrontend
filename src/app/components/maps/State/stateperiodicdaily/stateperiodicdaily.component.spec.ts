import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateperiodicdailyComponent } from './stateperiodicdaily.component';

describe('StateperiodicdailyComponent', () => {
  let component: StateperiodicdailyComponent;
  let fixture: ComponentFixture<StateperiodicdailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateperiodicdailyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateperiodicdailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
