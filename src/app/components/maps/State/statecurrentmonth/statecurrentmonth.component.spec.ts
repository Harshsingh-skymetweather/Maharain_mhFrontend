import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatecurrentmonthComponent } from './statecurrentmonth.component';

describe('StatecurrentmonthComponent', () => {
  let component: StatecurrentmonthComponent;
  let fixture: ComponentFixture<StatecurrentmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatecurrentmonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatecurrentmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
