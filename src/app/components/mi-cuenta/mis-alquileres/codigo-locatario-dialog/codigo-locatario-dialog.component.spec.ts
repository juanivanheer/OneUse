import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoLocatarioDialogComponent } from './codigo-locatario-dialog.component';

describe('CodigoLocatarioDialogComponent', () => {
  let component: CodigoLocatarioDialogComponent;
  let fixture: ComponentFixture<CodigoLocatarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoLocatarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoLocatarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
