import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastyeartehsilcountComponent } from './pastyeartehsilcount.component';

describe('PastyeartehsilcountComponent', () => {
  let component: PastyeartehsilcountComponent;
  let fixture: ComponentFixture<PastyeartehsilcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastyeartehsilcountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastyeartehsilcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
