import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPropietarioDialogComponent } from './datos-propietario-dialog.component';

describe('DatosPropietarioDialogComponent', () => {
  let component: DatosPropietarioDialogComponent;
  let fixture: ComponentFixture<DatosPropietarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPropietarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPropietarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
