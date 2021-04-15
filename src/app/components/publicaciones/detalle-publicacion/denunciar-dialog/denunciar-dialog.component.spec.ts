import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciarDialogComponent } from './denunciar-dialog.component';

describe('DenunciarDialogComponent', () => {
  let component: DenunciarDialogComponent;
  let fixture: ComponentFixture<DenunciarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenunciarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
