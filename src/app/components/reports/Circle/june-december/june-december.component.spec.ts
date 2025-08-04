import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuneDecemberComponent } from './june-december.component';

describe('JuneDecemberComponent', () => {
  let component: JuneDecemberComponent;
  let fixture: ComponentFixture<JuneDecemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuneDecemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuneDecemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
