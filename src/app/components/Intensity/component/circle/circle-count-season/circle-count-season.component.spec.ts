import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleCountSeasonComponent } from './circle-count-season.component';

describe('CircleCountSeasonComponent', () => {
  let component: CircleCountSeasonComponent;
  let fixture: ComponentFixture<CircleCountSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleCountSeasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleCountSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
