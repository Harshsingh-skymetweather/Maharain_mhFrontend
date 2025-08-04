import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroppopComponent } from './croppop.component';

describe('CroppopComponent', () => {
  let component: CroppopComponent;
  let fixture: ComponentFixture<CroppopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CroppopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CroppopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
