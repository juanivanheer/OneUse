import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaReclamoDialogComponent } from './respuesta-reclamo-dialog.component';

describe('RespuestaReclamoDialogComponent', () => {
  let component: RespuestaReclamoDialogComponent;
  let fixture: ComponentFixture<RespuestaReclamoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaReclamoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaReclamoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
