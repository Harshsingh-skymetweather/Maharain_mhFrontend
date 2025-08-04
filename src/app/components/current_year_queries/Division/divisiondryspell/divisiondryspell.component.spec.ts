import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisiondryspellComponent } from './divisiondryspell.component';

describe('DivisiondryspellComponent', () => {
  let component: DivisiondryspellComponent;
  let fixture: ComponentFixture<DivisiondryspellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisiondryspellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisiondryspellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
