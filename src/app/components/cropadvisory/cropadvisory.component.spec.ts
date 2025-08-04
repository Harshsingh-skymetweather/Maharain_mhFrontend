import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropadvisoryComponent } from './cropadvisory.component';

describe('CropadvisoryComponent', () => {
  let component: CropadvisoryComponent;
  let fixture: ComponentFixture<CropadvisoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropadvisoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropadvisoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
