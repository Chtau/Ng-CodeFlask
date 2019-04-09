import { TestBed } from '@angular/core/testing';

import { NgCodeflaskService } from './ng-codeflask.service';

describe('NgCodeflaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgCodeflaskService = TestBed.get(NgCodeflaskService);
    expect(service).toBeTruthy();
  });
});
