import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilCountSeasonComponent } from './tehsil-count-season.component';

describe('TehsilCountSeasonComponent', () => {
  let component: TehsilCountSeasonComponent;
  let fixture: ComponentFixture<TehsilCountSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilCountSeasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilCountSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
