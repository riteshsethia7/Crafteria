import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient , private router : Router) { }
  public serverurl = ' http://localhost:3000/server';

  Products = [];
  public sortsubcat ;
  public sortcat ;
  singleproduct = []
  private productsup = new Subject<any>();
  private singleproductup = new Subject<any>()

  //Upload product into the database
  uploadproduct(form:any , sellerid : string , image : File){
    const product = new FormData();
    product.append('name',form.value.name)
    product.append('price',form.value.price)
    product.append('category',form.value.category)
    product.append('subcategory',form.value.subcategory)
    product.append('quantity',form.value.quantity)
    product.append('productdetails',form.value.productspecifications)
    product.append('productdescription',form.value.productdescription)
    product.append('sellerid',sellerid)
    product.append('image',image,form.value.name)
    this.http.post<any>(this.serverurl+'/addproduct', product).subscribe((res)=>{console.log(res);})
  }

  //Find a single product
  getproduct(id:string){
    let param = new HttpParams();
    param = param.append('id',id);
    this.http.get<any>(this.serverurl+'/singleproduct',{params:param}).subscribe((res)=>{
      this.Products = res.product;
      this.singleproduct = res.product;
      this.productsup.next([...this.Products]);
      this.singleproductup.next([...this.singleproduct]);
    })

  }



  // Fetch seller specific products
  getsellerproduct(sellerid : string){
    let param = new HttpParams() ;
    param = param.append('sellerid',sellerid);
    this.http.get<any>(this.serverurl+'/allsellerproducts', {params: param}).subscribe((res)=>{
      this.Products = res.products;
      this.productsup.next([...this.Products]);
    })
  }

  // return the update products array for any type of request
  getproducts(){
    return this.productsup.asObservable();
  }

  //return single product
  getsingleproduct(){
    return this.singleproductup.asObservable();
  }

  // Update product
  updateproduct(form:any , id : string , image : File | string){
    let product ;
    if (typeof(image) === 'object'){
    product = new FormData();
    product.append('name',form.value.name)
    product.append('price',form.value.price)
    product.append('category',form.value.category)
    product.append('subcategory',form.value.subcategory)
    product.append('quantity',form.value.quantity)
    product.append('productdetails',form.value.productspecifications)
    product.append('productdescription',form.value.productdescription)
    product.append('image',image,form.value.name)
    }
    else{
    product = new FormData();
    product.append('name',form.value.name)
    product.append('price',form.value.price)
    product.append('category',form.value.category)
    product.append('subcategory',form.value.subcategory)
    product.append('quantity',form.value.quantity)
    product.append('productdetails',form.value.productspecifications)
    product.append('productdescription',form.value.productdescription)
    product.append('image',image)

    }
    this.http.put(this.serverurl+'/updateproduct/'+id,product).subscribe(res=>{

    })
  }

  // Fetch products for the user with sortlogic
  displayproducts(cat,subcat,sortlogic){
    let param ;
    if (subcat != 'none'){
      param = new HttpParams();
      param = param.append('cat',cat)
      param = param.append('subcat',subcat)
      param = param.append('sort',sortlogic)
    }
    else if (cat != 'none'){
      param = new HttpParams();
      param = param.append('cat',cat)
      param =  param.append('sort',sortlogic)
      param =  param.append('subcat','none')
    }
    else {
      param = new HttpParams();
      param = param.append('cat','none')
      param =  param.append('sort',sortlogic)
      param =  param.append('subcat','none')
      this.sortcat = 'none'
      this.sortsubcat ='none'
    }
    this.http.get<any>(this.serverurl+'/sortedproducts',{params:param}).subscribe((res)=>{
      this.Products = res.products;
      this.productsup.next([...this.Products]);
    })
  }

  //Upddate univarsal subcat and cat for sorting
  updatecatsubcat(cat : string,subcat : string){
    this.sortsubcat = subcat ;
    this.sortcat = cat ;
  }
  updatecat(cat:string){
    this.sortsubcat = 'none';
    this.sortcat = cat ;
  }

  //Add product to cart in database
  addtocart(userid,productid,qty,proqty,name,price){
    const item = {
      productid : productid,
      userid :userid,
      qty : qty,
      proqty : proqty,
      name : name,
      price : price,
    }
    this.http.post<any>(this.serverurl+"/addtocart",item).subscribe((res)=>{
    })
  }

  //delete items from cart
  deletefromcart(userid,id){
    this.http.delete(this.serverurl+'/deletedfromcart/'+userid+'/'+id).subscribe(()=>{
    })
  }

 //Fetch cart items
 findcartitems(userid){
  let param = new HttpParams() ;
  param = param.append('id',userid);
  this.http.get<any>(this.serverurl+'/cartitems',{params:param}).subscribe((result)=>{
    this.Products = result.cartitems
    this.productsup.next([...this.Products]);
  })
 }
}
