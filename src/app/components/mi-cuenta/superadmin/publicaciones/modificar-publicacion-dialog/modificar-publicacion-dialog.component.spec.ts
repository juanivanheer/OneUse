import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPublicacionDialogComponent } from './modificar-publicacion-dialog.component';

describe('ModificarPublicacionDialogComponent', () => {
  let component: ModificarPublicacionDialogComponent;
  let fixture: ComponentFixture<ModificarPublicacionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarPublicacionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPublicacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
