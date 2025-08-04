import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistmonthWiseComponent } from './distmonth-wise.component';

describe('DistmonthWiseComponent', () => {
  let component: DistmonthWiseComponent;
  let fixture: ComponentFixture<DistmonthWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistmonthWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistmonthWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
