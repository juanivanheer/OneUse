import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaCategoriasComponent } from './busqueda-categorias.component';

describe('BusquedaCategoriasComponent', () => {
  let component: BusquedaCategoriasComponent;
  let fixture: ComponentFixture<BusquedaCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
