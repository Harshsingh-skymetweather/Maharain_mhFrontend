import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehdailyrainComponent } from './tehdailyrain.component';

describe('TehdailyrainComponent', () => {
  let component: TehdailyrainComponent;
  let fixture: ComponentFixture<TehdailyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehdailyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehdailyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
