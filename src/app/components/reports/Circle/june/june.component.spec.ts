import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuneComponent } from './june.component';

describe('JuneComponent', () => {
  let component: JuneComponent;
  let fixture: ComponentFixture<JuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
