import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerService } from './seller.service';

@Injectable()
export class SellerInterceptor implements HttpInterceptor {

  constructor(public service:SellerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.service.gettoken();
    const authreq = request.clone({
      headers : request.headers.set('Authorization',"Bearer " + token)
    });
    return next.handle(request);
  }
}
