import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehheavyrainComponent } from './tehheavyrain.component';

describe('TehheavyrainComponent', () => {
  let component: TehheavyrainComponent;
  let fixture: ComponentFixture<TehheavyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehheavyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehheavyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
