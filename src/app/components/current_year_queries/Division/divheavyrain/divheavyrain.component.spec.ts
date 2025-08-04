import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivheavyrainComponent } from './divheavyrain.component';

describe('DivheavyrainComponent', () => {
  let component: DivheavyrainComponent;
  let fixture: ComponentFixture<DivheavyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivheavyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivheavyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
