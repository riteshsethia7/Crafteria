import { Component, OnInit } from '@angular/core';
import { UserService } from './authentication/user.service';
import { SellerService } from './authentication/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private userservice :UserService,private sellerservice:SellerService){}

  ngOnInit(){
    this.userservice.autoauthuser();
    this.sellerservice.autoauthseller();
  }
}
