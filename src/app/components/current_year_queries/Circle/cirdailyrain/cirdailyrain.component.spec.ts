import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirdailyrainComponent } from './cirdailyrain.component';

describe('CirdailyrainComponent', () => {
  let component: CirdailyrainComponent;
  let fixture: ComponentFixture<CirdailyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirdailyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirdailyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
