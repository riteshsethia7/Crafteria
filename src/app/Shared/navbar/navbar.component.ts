import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/authentication/seller.service';
import { Subscribable, Subscription } from 'rxjs';
import { UserService } from 'src/app/authentication/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userservice : UserService,private router :Router) { }
  public userauthenticated = false ;
  private authlistner : Subscription ;

  ngOnInit(): void {
    this.authlistner = this.userservice.getauthstatus().subscribe(isAuthenticated =>{
      this.userauthenticated = isAuthenticated ;
    })
  }
  onlogout(){
    this.userservice.logout()
    this.router.navigate(['/user/home/displayproduct'])

  }
}
