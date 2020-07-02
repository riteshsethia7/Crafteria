import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-navbarproducts',
  templateUrl: './navbarproducts.component.html',
  styleUrls: ['./navbarproducts.component.css'],
})
export class NavbarproductsComponent implements OnInit {
  constructor(public service : ProductsService) {}

  sortlogic: string = 'hitolo';
  Category : Array<any> ;
  Sorting : any ;
  ngOnInit(): void {
    this.Category = [
      {
        name: 'Home & Furniture',
        subcat: ['Decor', 'Chairs', 'Boxes', 'Paintings'],
      },
      {
        name: 'Stationery',
        subcat: ['Notebooks', 'Envelopes', 'Pens & Pencils', 'Gift Cards'],
      },
      {
        name: 'Clothing',
        subcat: ['stoles', 'socks', 'mufflers', 'caps', 'Garments'],
      },
      {
        name: 'Jewelry',
        subcat: ['Earrings', 'Necklaces', 'Bangles & Bracelets'],
      },
      {
        name: 'Accesories',
        subcat: ['Bags & Wallets', 'Footwear', 'Key Chains'],
      },
      { name: 'Pottery', subcat: ['Mugs & Cups', 'Crockery'] },
    ];
    this.Sorting = [
      {
        name: 'Price High to Low',
        value: 'lotohi',
      },
      {
        name: 'Price Low to High',
        value: 'hitolo',
      },
      {
        name : 'Ratig Highest',
        value : 'rating'
      }
    ];
  }


  updatedata(subcate,cat){
    this.service.updatecatsubcat(cat,subcate)
  }
  updatecatdata(cat){
    this.service.updatecat(cat)
  }
}
