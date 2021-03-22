import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuacionObtenidaDialogComponent } from './puntuacion-obtenida-dialog.component';

describe('PuntuacionObtenidaDialogComponent', () => {
  let component: PuntuacionObtenidaDialogComponent;
  let fixture: ComponentFixture<PuntuacionObtenidaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntuacionObtenidaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntuacionObtenidaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
