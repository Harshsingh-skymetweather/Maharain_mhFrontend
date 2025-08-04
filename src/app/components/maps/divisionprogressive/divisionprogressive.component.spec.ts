import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionprogressiveComponent } from './divisionprogressive.component';

describe('DivisionprogressiveComponent', () => {
  let component: DivisionprogressiveComponent;
  let fixture: ComponentFixture<DivisionprogressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionprogressiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionprogressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
