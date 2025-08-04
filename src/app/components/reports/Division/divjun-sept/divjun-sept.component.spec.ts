import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivjunSeptComponent } from './divjun-sept.component';

describe('DivjunSeptComponent', () => {
  let component: DivjunSeptComponent;
  let fixture: ComponentFixture<DivjunSeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivjunSeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivjunSeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
