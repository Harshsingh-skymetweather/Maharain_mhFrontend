import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionselectedmonthComponent } from './divisionselectedmonth.component';

describe('DivisionselectedmonthComponent', () => {
  let component: DivisionselectedmonthComponent;
  let fixture: ComponentFixture<DivisionselectedmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionselectedmonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionselectedmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
