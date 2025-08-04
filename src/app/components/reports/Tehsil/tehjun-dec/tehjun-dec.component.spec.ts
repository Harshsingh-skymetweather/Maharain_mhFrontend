import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehjunDecComponent } from './tehjun-dec.component';

describe('TehjunDecComponent', () => {
  let component: TehjunDecComponent;
  let fixture: ComponentFixture<TehjunDecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehjunDecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehjunDecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
