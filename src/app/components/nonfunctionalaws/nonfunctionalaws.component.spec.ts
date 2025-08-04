import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonfunctionalawsComponent } from './nonfunctionalaws.component';

describe('NonfunctionalawsComponent', () => {
  let component: NonfunctionalawsComponent;
  let fixture: ComponentFixture<NonfunctionalawsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonfunctionalawsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonfunctionalawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
