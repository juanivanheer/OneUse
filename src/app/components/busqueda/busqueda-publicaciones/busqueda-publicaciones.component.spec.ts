import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPublicacionesComponent } from './busqueda-publicaciones.component';

describe('BusquedaPublicacionesComponent', () => {
  let component: BusquedaPublicacionesComponent;
  let fixture: ComponentFixture<BusquedaPublicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaPublicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
