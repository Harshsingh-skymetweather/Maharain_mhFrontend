import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilhqDailyrainselectedmonthComponent } from './tehsilhq-dailyrainselectedmonth.component';

describe('TehsilhqDailyrainselectedmonthComponent', () => {
  let component: TehsilhqDailyrainselectedmonthComponent;
  let fixture: ComponentFixture<TehsilhqDailyrainselectedmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilhqDailyrainselectedmonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilhqDailyrainselectedmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
