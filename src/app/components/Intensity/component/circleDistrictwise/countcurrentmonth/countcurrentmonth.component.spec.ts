import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountcurrentmonthComponent } from './countcurrentmonth.component';

describe('CountcurrentmonthComponent', () => {
  let component: CountcurrentmonthComponent;
  let fixture: ComponentFixture<CountcurrentmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountcurrentmonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountcurrentmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
