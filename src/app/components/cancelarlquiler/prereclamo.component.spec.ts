import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrereclamoComponent } from './prereclamo.component';

describe('PrereclamoComponent', () => {
  let component: PrereclamoComponent;
  let fixture: ComponentFixture<PrereclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrereclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrereclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
