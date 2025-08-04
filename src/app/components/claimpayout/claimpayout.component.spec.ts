import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimpayoutComponent } from './claimpayout.component';

describe('ClaimpayoutComponent', () => {
  let component: ClaimpayoutComponent;
  let fixture: ComponentFixture<ClaimpayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimpayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimpayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
