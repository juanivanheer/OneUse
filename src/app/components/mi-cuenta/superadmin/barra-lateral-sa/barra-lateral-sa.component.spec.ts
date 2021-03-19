import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraLateralSaComponent } from './barra-lateral-sa.component';

describe('BarraLateralSaComponent', () => {
  let component: BarraLateralSaComponent;
  let fixture: ComponentFixture<BarraLateralSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraLateralSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraLateralSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
