import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoDevolucionPropietarioDialogComponent } from './codigo-devolucion-propietario-dialog.component';

describe('CodigoDevolucionPropietarioDialogComponent', () => {
  let component: CodigoDevolucionPropietarioDialogComponent;
  let fixture: ComponentFixture<CodigoDevolucionPropietarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoDevolucionPropietarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoDevolucionPropietarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
