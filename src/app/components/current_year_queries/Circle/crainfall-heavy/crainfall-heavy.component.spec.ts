import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CRainfallHeavyComponent } from './crainfall-heavy.component';

describe('CRainfallHeavyComponent', () => {
  let component: CRainfallHeavyComponent;
  let fixture: ComponentFixture<CRainfallHeavyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CRainfallHeavyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CRainfallHeavyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
