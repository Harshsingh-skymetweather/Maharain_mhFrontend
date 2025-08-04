import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistListProgressiveComponent } from './dist-list-progressive.component';

describe('DistListProgressiveComponent', () => {
  let component: DistListProgressiveComponent;
  let fixture: ComponentFixture<DistListProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistListProgressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistListProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
