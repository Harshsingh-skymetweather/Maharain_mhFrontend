import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilCountProgressiveComponent } from './tehsil-count-progressive.component';

describe('TehsilCountProgressiveComponent', () => {
  let component: TehsilCountProgressiveComponent;
  let fixture: ComponentFixture<TehsilCountProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilCountProgressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilCountProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
