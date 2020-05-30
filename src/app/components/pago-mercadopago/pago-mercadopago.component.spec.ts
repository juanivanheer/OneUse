import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMercadopagoComponent } from './pago-mercadopago.component';

describe('PagoMercadopagoComponent', () => {
  let component: PagoMercadopagoComponent;
  let fixture: ComponentFixture<PagoMercadopagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoMercadopagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoMercadopagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
