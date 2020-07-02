import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './seller.service';

@Injectable({
  providedIn: 'root'
})
export class SellerauthGuard implements CanActivate {
  constructor(private sellerservice :SellerService , private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if( ! this.sellerservice.issellerauth()){
        this.router.navigateByUrl('/seller/login')
      }
    return true;
  }

}
