import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamarAlquilerComponent } from './reclamar-alquiler.component';

describe('ReclamarAlquileromponent', () => {
  let component: ReclamarAlquilerComponent;
  let fixture: ComponentFixture<ReclamarAlquilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamarAlquilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamarAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
