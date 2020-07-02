import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/authentication/user.service';
import { MiscService } from '../misc.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {

  constructor(
    public userservice: UserService,
    public misc:MiscService,
    private router: Router,
    private productservice: ProductsService) { }
  public cartitems: any = null;
  public usertoken;
  mySubscription: any;
  public total = 0;
  public address = [] ;
  ngOnInit(): void {
    this.usertoken = this.userservice.getdecodedtoken();
    this.misc.getaddress(this.usertoken.userid)
    this.misc.returnaddress().subscribe((res)=>{
      this.address = res
    })
    if (!this.userservice.isuserauth) {
      this.router.navigateByUrl('/user/login')
    }
      this.productservice.findcartitems(this.usertoken.userid);
      this.productservice.getproducts().subscribe((data) => {
        this.cartitems = data;
        for (let i = 0; i < this.cartitems.length; i++) {
          this.total +=
            this.cartitems[i].productprice * this.cartitems[i].quantity;
        }
        if(this.cartitems.length > 0){
          this.misc.placeorder(this.usertoken.userid,'success',this.total,this.cartitems)
            }
      })
  }
}
