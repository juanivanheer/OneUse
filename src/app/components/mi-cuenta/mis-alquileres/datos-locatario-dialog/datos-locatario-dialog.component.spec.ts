import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosLocatarioDialogComponent } from './datos-locatario-dialog.component';

describe('DatosLocatarioDialogComponent', () => {
  let component: DatosLocatarioDialogComponent;
  let fixture: ComponentFixture<DatosLocatarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosLocatarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosLocatarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
