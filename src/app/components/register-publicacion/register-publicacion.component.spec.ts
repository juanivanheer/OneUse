import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPublicacionComponent } from './register-publicacion.component';

describe('RegisterPublicacionComponent', () => {
  let component: RegisterPublicacionComponent;
  let fixture: ComponentFixture<RegisterPublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
