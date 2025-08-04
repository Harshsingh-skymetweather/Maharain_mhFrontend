import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilListProgressiveComponent } from './tehsil-list-progressive.component';

describe('TehsilListProgressiveComponent', () => {
  let component: TehsilListProgressiveComponent;
  let fixture: ComponentFixture<TehsilListProgressiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilListProgressiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilListProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
