import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivseasonComponent } from './divseason.component';

describe('DivseasonComponent', () => {
  let component: DivseasonComponent;
  let fixture: ComponentFixture<DivseasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivseasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivseasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
