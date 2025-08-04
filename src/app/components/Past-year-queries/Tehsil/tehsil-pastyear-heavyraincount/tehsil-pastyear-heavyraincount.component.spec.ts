import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilPastyearHeavyraincountComponent } from './tehsil-pastyear-heavyraincount.component';

describe('TehsilPastyearHeavyraincountComponent', () => {
  let component: TehsilPastyearHeavyraincountComponent;
  let fixture: ComponentFixture<TehsilPastyearHeavyraincountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilPastyearHeavyraincountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilPastyearHeavyraincountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
