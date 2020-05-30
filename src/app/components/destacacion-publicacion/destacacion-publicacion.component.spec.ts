import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestacacionPublicacionComponent } from './destacacion-publicacion.component';

describe('DestacacionPublicacionComponent', () => {
  let component: DestacacionPublicacionComponent;
  let fixture: ComponentFixture<DestacacionPublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestacacionPublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestacacionPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
