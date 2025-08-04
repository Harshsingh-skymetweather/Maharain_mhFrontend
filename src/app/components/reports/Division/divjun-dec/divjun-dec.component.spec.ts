import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivjunDecComponent } from './divjun-dec.component';

describe('DivjunDecComponent', () => {
  let component: DivjunDecComponent;
  let fixture: ComponentFixture<DivjunDecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivjunDecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivjunDecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
