import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpwdComponent } from './newpwd.component';

describe('NewpwdComponent', () => {
  let component: NewpwdComponent;
  let fixture: ComponentFixture<NewpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
