import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamoExitoComponent } from './reclamo-exito.component';

describe('ReclamoExitoComponent', () => {
  let component: ReclamoExitoComponent;
  let fixture: ComponentFixture<ReclamoExitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamoExitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamoExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
