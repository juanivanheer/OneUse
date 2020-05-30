import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionEmailComponent } from './confirmacionemail.component';

describe('ConfirmacionEmailComponent', () => {
  let component: ConfirmacionEmailComponent;
  let fixture: ComponentFixture<ConfirmacionEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
