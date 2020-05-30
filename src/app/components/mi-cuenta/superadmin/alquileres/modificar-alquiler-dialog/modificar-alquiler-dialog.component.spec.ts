import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAlquilerDialogComponent } from './modificar-alquiler-dialog.component';

describe('ModificarAlquilerDialogComponent', () => {
  let component: ModificarAlquilerDialogComponent;
  let fixture: ComponentFixture<ModificarAlquilerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarAlquilerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAlquilerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
