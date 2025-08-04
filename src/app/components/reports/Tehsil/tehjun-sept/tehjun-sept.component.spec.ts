import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehjunSeptComponent } from './tehjun-sept.component';

describe('TehjunSeptComponent', () => {
  let component: TehjunSeptComponent;
  let fixture: ComponentFixture<TehjunSeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehjunSeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehjunSeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
