import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistCountProgressiveComponent } from './dist-count-progressive.component';

describe('DistCountProgressiveComponent', () => {
  let component: DistCountProgressiveComponent;
  let fixture: ComponentFixture<DistCountProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistCountProgressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistCountProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
