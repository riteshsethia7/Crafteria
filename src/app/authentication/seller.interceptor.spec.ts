import { TestBed } from '@angular/core/testing';

import { SellerInterceptor } from './seller.interceptor';

describe('SellerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SellerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SellerInterceptor = TestBed.inject(SellerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
