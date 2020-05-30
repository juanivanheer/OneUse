import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPublicacionDialogComponent } from './eliminar-publicacion-dialog.component';

describe('EliminarPublicacionDialogComponent', () => {
  let component: EliminarPublicacionDialogComponent;
  let fixture: ComponentFixture<EliminarPublicacionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarPublicacionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarPublicacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
