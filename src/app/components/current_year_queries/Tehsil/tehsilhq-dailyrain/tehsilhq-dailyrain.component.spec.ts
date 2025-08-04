import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilhqDailyrainComponent } from './tehsilhq-dailyrain.component';

describe('TehsilhqDailyrainComponent', () => {
  let component: TehsilhqDailyrainComponent;
  let fixture: ComponentFixture<TehsilhqDailyrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilhqDailyrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TehsilhqDailyrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
