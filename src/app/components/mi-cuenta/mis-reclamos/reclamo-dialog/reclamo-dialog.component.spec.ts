import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamoDialogComponent } from './reclamo-dialog.component';

describe('ReclamoDialogComponent', () => {
  let component: ReclamoDialogComponent;
  let fixture: ComponentFixture<ReclamoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
