import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUsuarioDialogComponent } from './modificar-usuario-dialog.component';

describe('ModificarUsuarioDialogComponent', () => {
  let component: ModificarUsuarioDialogComponent;
  let fixture: ComponentFixture<ModificarUsuarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarUsuarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
