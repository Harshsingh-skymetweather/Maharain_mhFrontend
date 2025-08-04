import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilDryspellComponent } from './tehsil-dryspell.component';

describe('TehsilDryspellComponent', () => {
  let component: TehsilDryspellComponent;
  let fixture: ComponentFixture<TehsilDryspellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilDryspellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilDryspellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
