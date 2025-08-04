import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuneSeptComponent } from './june-sept.component';

describe('JuneSeptComponent', () => {
  let component: JuneSeptComponent;
  let fixture: ComponentFixture<JuneSeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuneSeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuneSeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
