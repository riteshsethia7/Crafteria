import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/authentication/user.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/Shared/products.service';
import { MiscService } from 'src/app/Shared/misc.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit ,OnDestroy{

  constructor(
    public userservice: UserService,
    public misc:MiscService,
    private router: Router,
    private productservice: ProductsService) { }
  public cartitems: any = null;
  public usertoken;
  mySubscription: any;
  public total = 0;
  public address ;
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
      this.productservice.getproducts().pipe(take(1)).subscribe((data) => {
        this.cartitems = data;
        for (let i = 0; i < this.cartitems.length; i++) {
          this.total +=
            this.cartitems[i].productprice * this.cartitems[i].quantity;
        }
    if(this.cartitems.length > 0){
      console.log(this.total)
    this.misc.placeorder(this.usertoken.userid,'success',this.total,this.cartitems)
      }});


  }

  ngOnDestroy():void {

  }

}
