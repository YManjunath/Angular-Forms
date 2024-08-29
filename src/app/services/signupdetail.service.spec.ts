import { TestBed } from '@angular/core/testing';

import { SignupdetailService } from './signupdetail.service';

describe('SignupdetailService', () => {
  let service: SignupdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
