import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivmonthWiseComponent } from './divmonth-wise.component';

describe('DivmonthWiseComponent', () => {
  let component: DivmonthWiseComponent;
  let fixture: ComponentFixture<DivmonthWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivmonthWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivmonthWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
