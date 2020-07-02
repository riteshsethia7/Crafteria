import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/authentication/seller.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public sellerservice : SellerService) { }

  public sellerdata =[];
  public sellertoken : any;
  ngOnInit(): void {
    this.sellertoken = this.sellerservice.getdecodedtoken()
    this.sellerservice.getsellerdata(this.sellertoken.userid)
    this.sellerservice.sellerdataobservable().subscribe((data)=>{
      this.sellerdata = data
      console.log(this.sellerdata)
    })
  }

}
