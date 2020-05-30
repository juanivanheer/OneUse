import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionExitoComponent } from './publicacion-exito.component';

describe('PublicacionExitoComponent', () => {
  let component: PublicacionExitoComponent;
  let fixture: ComponentFixture<PublicacionExitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionExitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
