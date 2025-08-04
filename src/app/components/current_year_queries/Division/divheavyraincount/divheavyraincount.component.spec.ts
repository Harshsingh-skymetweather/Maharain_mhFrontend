import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivheavyraincountComponent } from './divheavyraincount.component';

describe('DivheavyraincountComponent', () => {
  let component: DivheavyraincountComponent;
  let fixture: ComponentFixture<DivheavyraincountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivheavyraincountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivheavyraincountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
