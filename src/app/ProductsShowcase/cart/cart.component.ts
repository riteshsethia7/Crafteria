import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/authentication/user.service';
import { ProductsService } from 'src/app/Shared/products.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    public userservice: UserService,
    private router: Router,
    private productservice: ProductsService
  ) {}

  public cartitems: any = null;
  public usertoken;
  mySubscription: any;
  public total = 0;
  ngOnInit(): void {
    this.usertoken = this.userservice.getdecodedtoken();
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
      });

  }
  addtocart(id, qty, proqty, name, price) {
    this.productservice.deletefromcart(this.usertoken.userid, id);
    this.productservice.addtocart(
      this.usertoken.userid,
      id,
      qty.viewModel,
      proqty,
      name,
      price
    );
    this.router.navigateByUrl('/blank');
  }

  deletefromcart(proid) {
    this.productservice.deletefromcart(this.usertoken.userid, proid);
    this.router.navigateByUrl('/blank');
  }



  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
