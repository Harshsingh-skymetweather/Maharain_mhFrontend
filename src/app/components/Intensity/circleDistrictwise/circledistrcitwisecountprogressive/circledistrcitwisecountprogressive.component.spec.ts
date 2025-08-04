import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircledistrcitwisecountprogressiveComponent } from './circledistrcitwisecountprogressive.component';

describe('CircledistrcitwisecountprogressiveComponent', () => {
  let component: CircledistrcitwisecountprogressiveComponent;
  let fixture: ComponentFixture<CircledistrcitwisecountprogressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircledistrcitwisecountprogressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircledistrcitwisecountprogressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
