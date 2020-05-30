import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPublicacionesDialogComponent } from './dehsabilitar-dialog';

describe('MisPublicacionesDialogComponent', () => {
  let component: MisPublicacionesDialogComponent;
  let fixture: ComponentFixture<MisPublicacionesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPublicacionesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPublicacionesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
