import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisioncurrentmonthComponent } from './divisioncurrentmonth.component';

describe('DivisioncurrentmonthComponent', () => {
  let component: DivisioncurrentmonthComponent;
  let fixture: ComponentFixture<DivisioncurrentmonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisioncurrentmonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisioncurrentmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
