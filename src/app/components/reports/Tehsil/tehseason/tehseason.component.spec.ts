import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehseasonComponent } from './tehseason.component';

describe('TehseasonComponent', () => {
  let component: TehseasonComponent;
  let fixture: ComponentFixture<TehseasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehseasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehseasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
