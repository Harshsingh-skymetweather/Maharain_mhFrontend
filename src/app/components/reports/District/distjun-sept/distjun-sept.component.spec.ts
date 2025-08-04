import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistjunSeptComponent } from './distjun-sept.component';

describe('DistjunSeptComponent', () => {
  let component: DistjunSeptComponent;
  let fixture: ComponentFixture<DistjunSeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistjunSeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistjunSeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
