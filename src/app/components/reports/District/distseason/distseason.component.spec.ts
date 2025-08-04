import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistseasonComponent } from './distseason.component';

describe('DistseasonComponent', () => {
  let component: DistseasonComponent;
  let fixture: ComponentFixture<DistseasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistseasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistseasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
