import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarAlquilerComponent } from './cancelar-alquiler.component';

describe('CancelarAlquileromponent', () => {
  let component: CancelarAlquilerComponent;
  let fixture: ComponentFixture<CancelarAlquilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelarAlquilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
