import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarReclamoDialogComponent } from './eliminar-reclamo-dialog.component';

describe('EliminarReclamoDialogComponent', () => {
  let component: EliminarReclamoDialogComponent;
  let fixture: ComponentFixture<EliminarReclamoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarReclamoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarReclamoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
