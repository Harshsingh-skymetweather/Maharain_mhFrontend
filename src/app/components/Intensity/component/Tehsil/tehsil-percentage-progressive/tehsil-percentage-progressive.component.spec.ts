import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilPercentageProgressiveComponent } from './tehsil-percentage-progressive.component';

describe('TehsilPercentageProgressiveComponent', () => {
  let component: TehsilPercentageProgressiveComponent;
  let fixture: ComponentFixture<TehsilPercentageProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilPercentageProgressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilPercentageProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
