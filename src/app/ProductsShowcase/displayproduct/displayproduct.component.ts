import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Shared/products.service';

@Component({
  selector: 'app-displayproduct',
  templateUrl: './displayproduct.component.html',
  styleUrls: ['./displayproduct.component.css']
})
export class DisplayproductComponent implements OnInit {

  constructor(private route:ActivatedRoute , private productservice : ProductsService , private rou : Router) { }
  products : any ;
  cat : string  = 'none';
  subcat :string  = 'none';
  sortlogic = 'hitolo' ;
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('cat')){
      this.cat = this.route.snapshot.paramMap.get('cat');}
    if(this.route.snapshot.paramMap.get('subcat')){
      this.subcat = this.route.snapshot.paramMap.get('subcat');}
    if (this.route.snapshot.paramMap.get('sort')){
      this.sortlogic = this.route.snapshot.paramMap.get('sort');
    }
    this.productservice.displayproducts(this.cat , this.subcat , this.sortlogic)
    this.productservice.getproducts().subscribe((res) =>{
      this.products = res
    })
    this.rou.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

}
