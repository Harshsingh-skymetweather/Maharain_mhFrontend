import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistdailyrainComponent } from './distdailyrain.component';

describe('DistdailyrainComponent', () => {
  let component: DistdailyrainComponent;
  let fixture: ComponentFixture<DistdailyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistdailyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistdailyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
