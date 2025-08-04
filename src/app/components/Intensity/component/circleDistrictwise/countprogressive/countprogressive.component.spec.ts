import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountprogressiveComponent } from './countprogressive.component';

describe('CountprogressiveComponent', () => {
  let component: CountprogressiveComponent;
  let fixture: ComponentFixture<CountprogressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountprogressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountprogressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
