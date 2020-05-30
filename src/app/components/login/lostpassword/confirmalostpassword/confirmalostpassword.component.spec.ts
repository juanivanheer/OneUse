import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaLostPasswordComponent } from './confirmalostpassword.component';

describe('ConfirmaLostPasswordComponent', () => {
  let component: ConfirmaLostPasswordComponent;
  let fixture: ComponentFixture<ConfirmaLostPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaLostPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaLostPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
