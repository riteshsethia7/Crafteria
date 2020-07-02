import { Component, OnInit } from '@angular/core';
import { MiscService } from 'src/app/Shared/misc.service';
import { SellerService } from 'src/app/authentication/seller.service';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {

  constructor(public miscservice : MiscService , private sellerservice : SellerService) { }

  public productssold :any ;
  public sellertoken : any ;
  public total : number = 0;
  ngOnInit(): void {
    this.sellertoken = this.sellerservice.getdecodedtoken()
    this.miscservice.fetchearningdata(this.sellertoken.userid)
    this.miscservice.returnaddress().subscribe(res=>{
    this.productssold = res
    console.log(this.productssold)
    this.productssold.forEach(element => {
      this.total = this.total + element.revenue
    });
    })
  }

}
