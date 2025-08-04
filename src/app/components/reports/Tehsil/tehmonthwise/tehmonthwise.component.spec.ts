import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehmonthwiseComponent } from './tehmonthwise.component';

describe('TehmonthwiseComponent', () => {
  let component: TehmonthwiseComponent;
  let fixture: ComponentFixture<TehmonthwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehmonthwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehmonthwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
