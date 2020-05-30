import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosAlquilerComponent } from './pos-alquiler.component';

describe('PosAlquilerComponent', () => {
  let component: PosAlquilerComponent;
  let fixture: ComponentFixture<PosAlquilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosAlquilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
