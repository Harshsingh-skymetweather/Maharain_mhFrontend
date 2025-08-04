import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivdailyrainComponent } from './divdailyrain.component';

describe('DivdailyrainComponent', () => {
  let component: DivdailyrainComponent;
  let fixture: ComponentFixture<DivdailyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivdailyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivdailyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
