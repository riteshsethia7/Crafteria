import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/authentication/seller.service';
import { ProductsService } from 'src/app/Shared/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifyproduct',
  templateUrl: './modifyproduct.component.html',
  styleUrls: ['./modifyproduct.component.css'],
})
export class ModifyproductComponent implements OnInit {
  constructor(
    private sellerservice: SellerService,
    private productservice: ProductsService,
    private rou: Router
  ) {}
  jwtdata: any;
  products: any;
  ngOnInit(): void {
    if(this.sellerservice.issellerauth()) {
    this.jwtdata = this.sellerservice.getdecodedtoken();
    this.productservice.getsellerproduct(this.jwtdata.userid);
    this.productservice.getproducts().subscribe((data: any) => {
      this.products = data;
    });}
    else {
      this.rou.navigateByUrl('/seller/login');
    }
  }
}
