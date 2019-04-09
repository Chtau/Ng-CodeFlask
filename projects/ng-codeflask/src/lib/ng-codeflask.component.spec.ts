import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCodeflaskComponent } from './ng-codeflask.component';

describe('NgCodeflaskComponent', () => {
  let component: NgCodeflaskComponent;
  let fixture: ComponentFixture<NgCodeflaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgCodeflaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCodeflaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
