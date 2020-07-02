import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Shared/products.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/authentication/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productspecification',
  templateUrl: './productspecification.component.html',
  styleUrls: ['./productspecification.component.css']
})
export class ProductspecificationComponent implements OnInit {

  constructor(
    private productservice :ProductsService,
    private router :Router,
    private _snackBar: MatSnackBar,
    private actroute :ActivatedRoute,
    private userservice :UserService
  ) { }

  public product : any ;
  public userid : any;
  ngOnInit(): void {
    this.actroute.paramMap.subscribe((obj:ParamMap)=>{
      if (obj.has('id')){
        this.productservice.getproduct(obj.get('id'));
        this.productservice.getproducts().subscribe((res)=>{
          this.product = res[0]
        })
      }
    })
    this.userid = this.userservice.getdecodedtoken()
  }
  addtocart(id,qty,proqty,name,price){
    if(qty > this.product.quantity){
      this._snackBar.open("Quantity limit exceeded", "OOPS", {
        duration: 5000,
      });
    }
    else {
    this.productservice.deletefromcart(this.userid.userid,id)
    this.productservice.addtocart(this.userid.userid,id,qty.viewModel,proqty,name,price)
    this._snackBar.open("Product Added to the cart", "Hurray!!", {
      duration: 5000,
    });}
  }
}
