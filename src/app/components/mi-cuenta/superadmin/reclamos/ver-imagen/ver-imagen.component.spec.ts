import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerImagenComponent } from './ver-imagen.component';

describe('VerImagenComponent', () => {
  let component: VerImagenComponent;
  let fixture: ComponentFixture<VerImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
