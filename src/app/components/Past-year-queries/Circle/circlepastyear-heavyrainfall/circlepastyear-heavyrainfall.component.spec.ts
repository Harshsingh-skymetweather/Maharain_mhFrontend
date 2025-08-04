import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclepastyearHeavyrainfallComponent } from './circlepastyear-heavyrainfall.component';

describe('CirclepastyearHeavyrainfallComponent', () => {
  let component: CirclepastyearHeavyrainfallComponent;
  let fixture: ComponentFixture<CirclepastyearHeavyrainfallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirclepastyearHeavyrainfallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclepastyearHeavyrainfallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
