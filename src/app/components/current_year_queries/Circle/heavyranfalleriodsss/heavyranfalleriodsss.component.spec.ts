import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeavyranfalleriodsssComponent } from './heavyranfalleriodsss.component';

describe('HeavyranfalleriodsssComponent', () => {
  let component: HeavyranfalleriodsssComponent;
  let fixture: ComponentFixture<HeavyranfalleriodsssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeavyranfalleriodsssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeavyranfalleriodsssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
