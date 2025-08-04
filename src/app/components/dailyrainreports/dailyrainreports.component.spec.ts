import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyrainreportsComponent } from './dailyrainreports.component';

describe('DailyrainreportsComponent', () => {
  let component: DailyrainreportsComponent;
  let fixture: ComponentFixture<DailyrainreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyrainreportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyrainreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
