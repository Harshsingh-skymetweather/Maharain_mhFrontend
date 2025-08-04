import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilHeavyrainCountComponent } from './tehsil-heavyrain-count.component';

describe('TehsilHeavyrainCountComponent', () => {
  let component: TehsilHeavyrainCountComponent;
  let fixture: ComponentFixture<TehsilHeavyrainCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilHeavyrainCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilHeavyrainCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
