import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PyrDialogComponent } from './pyr-dialog.component';

describe('PyrDialogComponent', () => {
  let component: PyrDialogComponent;
  let fixture: ComponentFixture<PyrDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PyrDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PyrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
