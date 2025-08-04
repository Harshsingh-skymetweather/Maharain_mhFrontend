import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclepastyearDailyrainComponent } from './circlepastyear-dailyrain.component';

describe('CirclepastyearDailyrainComponent', () => {
  let component: CirclepastyearDailyrainComponent;
  let fixture: ComponentFixture<CirclepastyearDailyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirclepastyearDailyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclepastyearDailyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
