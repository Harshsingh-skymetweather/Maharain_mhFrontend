import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DryspellComponent } from './dryspell.component';

describe('DryspellComponent', () => {
  let component: DryspellComponent;
  let fixture: ComponentFixture<DryspellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DryspellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DryspellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
