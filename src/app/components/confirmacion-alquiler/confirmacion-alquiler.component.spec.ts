import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionAlquilerComponent } from './confirmacion-alquiler.component';

describe('ConfirmacionAlquilerComponent', () => {
  let component: ConfirmacionAlquilerComponent;
  let fixture: ComponentFixture<ConfirmacionAlquilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionAlquilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
