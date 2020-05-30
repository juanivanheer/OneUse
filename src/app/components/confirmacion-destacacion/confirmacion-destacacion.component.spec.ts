import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionDestacacionComponent } from './confirmacion-destacacion.component';

describe('ConfirmacionDestacacionComponent', () => {
  let component: ConfirmacionDestacacionComponent;
  let fixture: ComponentFixture<ConfirmacionDestacacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionDestacacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionDestacacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
