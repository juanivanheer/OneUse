import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosUsuariosDialogComponent } from './datos-usuarios-dialog.component';

describe('DatosUsuariosDialogComponent', () => {
  let component: DatosUsuariosDialogComponent;
  let fixture: ComponentFixture<DatosUsuariosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosUsuariosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosUsuariosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
