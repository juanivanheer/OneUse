import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciasDialogComponent } from './denuncias-dialog.component';

describe('DenunciasDialogComponent', () => {
  let component: DenunciasDialogComponent;
  let fixture: ComponentFixture<DenunciasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenunciasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
