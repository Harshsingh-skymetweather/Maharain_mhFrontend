import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainCompareComponent } from './rain-compare.component';

describe('RainCompareComponent', () => {
  let component: RainCompareComponent;
  let fixture: ComponentFixture<RainCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RainCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RainCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
