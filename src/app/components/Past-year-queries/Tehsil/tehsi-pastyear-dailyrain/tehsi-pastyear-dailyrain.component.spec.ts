import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsiPastyearDailyrainComponent } from './tehsi-pastyear-dailyrain.component';

describe('TehsiPastyearDailyrainComponent', () => {
  let component: TehsiPastyearDailyrainComponent;
  let fixture: ComponentFixture<TehsiPastyearDailyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsiPastyearDailyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsiPastyearDailyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
