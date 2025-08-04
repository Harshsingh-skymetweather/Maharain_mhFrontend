import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateprogressiveComponent } from './stateprogressive.component';

describe('StateprogressiveComponent', () => {
  let component: StateprogressiveComponent;
  let fixture: ComponentFixture<StateprogressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateprogressiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateprogressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
