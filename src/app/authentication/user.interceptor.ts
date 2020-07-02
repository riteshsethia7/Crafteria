import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(public service:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.service.gettoken();
    const authreq = request.clone({
      headers : request.headers.set('Authorization',"Bearer " + token)
    });

    return next.handle(request);
  }
}
