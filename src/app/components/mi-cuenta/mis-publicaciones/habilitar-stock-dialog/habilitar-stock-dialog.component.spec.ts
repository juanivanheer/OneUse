import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarStockDialogComponent } from './habilitar-stock-dialog.component';

describe('HabilitarStockDialogComponent', () => {
  let component: HabilitarStockDialogComponent;
  let fixture: ComponentFixture<HabilitarStockDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabilitarStockDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitarStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
