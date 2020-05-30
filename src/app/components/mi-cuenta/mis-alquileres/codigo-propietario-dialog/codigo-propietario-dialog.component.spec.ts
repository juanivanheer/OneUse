import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoPropietarioDialogComponent } from './codigo-propietario-dialog.component';

describe('CodigoPropietarioDialogComponent', () => {
  let component: CodigoPropietarioDialogComponent;
  let fixture: ComponentFixture<CodigoPropietarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoPropietarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoPropietarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
