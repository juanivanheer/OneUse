import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAlquileresDialogComponent } from './datos-alquileres-dialog.component';

describe('DatosAlquileresDialogComponent', () => {
  let component: DatosAlquileresDialogComponent;
  let fixture: ComponentFixture<DatosAlquileresDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosAlquileresDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAlquileresDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
