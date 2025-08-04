import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistjunDecComponent } from './distjun-dec.component';

describe('DistjunDecComponent', () => {
  let component: DistjunDecComponent;
  let fixture: ComponentFixture<DistjunDecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistjunDecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistjunDecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
