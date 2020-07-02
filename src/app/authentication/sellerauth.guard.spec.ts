import { TestBed } from '@angular/core/testing';

import { SellerauthGuard } from './sellerauth.guard';

describe('SellerauthGuard', () => {
  let guard: SellerauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SellerauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
