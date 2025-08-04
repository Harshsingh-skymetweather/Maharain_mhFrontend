import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastyearcirclecountComponent } from './pastyearcirclecount.component';

describe('PastyearcirclecountComponent', () => {
  let component: PastyearcirclecountComponent;
  let fixture: ComponentFixture<PastyearcirclecountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastyearcirclecountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastyearcirclecountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
