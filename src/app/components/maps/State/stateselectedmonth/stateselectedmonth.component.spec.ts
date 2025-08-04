import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateselectedmonthComponent } from './stateselectedmonth.component';

describe('StateselectedmonthComponent', () => {
  let component: StateselectedmonthComponent;
  let fixture: ComponentFixture<StateselectedmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateselectedmonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateselectedmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
