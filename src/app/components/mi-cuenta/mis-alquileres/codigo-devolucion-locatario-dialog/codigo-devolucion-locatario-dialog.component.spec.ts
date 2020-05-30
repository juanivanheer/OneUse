import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoDevolucionLocatarioDialogComponent } from './codigo-devolucion-locatario-dialog.component';

describe('CodigoDevolucionLocatarioDialogComponent', () => {
  let component: CodigoDevolucionLocatarioDialogComponent;
  let fixture: ComponentFixture<CodigoDevolucionLocatarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoDevolucionLocatarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoDevolucionLocatarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
