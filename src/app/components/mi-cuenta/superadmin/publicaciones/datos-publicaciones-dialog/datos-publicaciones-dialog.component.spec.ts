import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPublicacionesDialogComponent } from './datos-publicaciones-dialog.component';

describe('DatosPublicacionesDialogComponent', () => {
  let component: DatosPublicacionesDialogComponent;
  let fixture: ComponentFixture<DatosPublicacionesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPublicacionesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPublicacionesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
