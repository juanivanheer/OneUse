import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAlquilerDialogComponent } from './eliminar-alquiler-dialog.component';

describe('EliminarAlquilerDialogComponent', () => {
  let component: EliminarAlquilerDialogComponent;
  let fixture: ComponentFixture<EliminarAlquilerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarAlquilerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAlquilerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
