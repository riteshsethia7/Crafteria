import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { take, skip } from 'rxjs/operators';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(private http:HttpClient,private productservice:ProductsService) { }

  public serverurl = ' http://localhost:3000/server';
  private aaddresss ;
  public temp ;
  private addressup = new Subject<any>();

  // Adding address to the database
  saveaddress(form,userid){
    const adrs = {
      userid : userid,
    fullname : form.value.fullname,
    phoneno : form.value.phoneno,
    line1 : form.value.line1,
    line2 : form.value.line2,
    landmark: form.value.landmark,
    city : form.value.city,
    state : form.value.state,
    zip : form.value.zip
    }
    this.http.post<any>(this.serverurl+'/address',adrs).subscribe((res)=>{
      console.log(res.message)
    })
  }

  //fetching address from database
  getaddress(userid){
    let param = new HttpParams()
    param = param.append('id',userid)
    this.http.get<any>(this.serverurl+'/getaddress',{params:param}).subscribe((res)=>{
      this.aaddresss = res.address
      this.addressup.next([...this.aaddresss])
    })
  }
  // Returning the address
  returnaddress(){
    return this.addressup.asObservable()
  }

  //placing an order
  placeorder(userid,status,total,cartitems){
    const orderdata = {
      id : userid,
      status : status ,
      total : total,
      cart : cartitems
    }
    if (total > 0){
    this.http.post<any>(this.serverurl+'/orderplace',orderdata).subscribe((res)=>{})
    this.clearorder(userid)
   // this.updaterevenue([...cartitems])
   for(let i=0;i<cartitems.length;i++){
     this.addrevenue(cartitems[i],i)
   }
  }
  }
  //Clear cart when order is placed
  private  clearorder(userid){
    var param = new HttpParams()
    param = param.append('id',userid)
    this.http.delete<any>(this.serverurl+'/clearcart',{params:param}).subscribe((res)=>{})

  }

  // Fetch Order deatils
  orderdetails(userid){
    let param = new HttpParams()
    param = param.append('id',userid)
    this.http.get<any>(this.serverurl+'/orderdetails',{params:param}).subscribe((res)=>{
      this.aaddresss = res.order
      this.addressup.next([...this.aaddresss])
    })
  }

  // Update Seller earnings
  addrevenue(cartitem,i){
    let product : any ;
    this.productservice.getproduct(cartitem.productid)
    this.productservice.getsingleproduct().pipe(skip(i)).pipe(take(1)).subscribe(res=>{
      product = res
      let productearn = {
        id : product[0].sellerid,
        qty : cartitem.quantity,
        revenue : cartitem.quantity * cartitem.productprice,
        product : product
      }
      this.http.post<any>(this.serverurl+'/addearning',productearn).subscribe(res=>{})
    });
  }

  // Fetch data from seller earnings
  fetchearningdata(sellerid){
    let param = new HttpParams()
    param = param.append('id',sellerid)
    this.http.get<any>(this.serverurl+'/getsellerearnings',{params:param}).subscribe((res)=>{
      this.aaddresss = res.data
      this.addressup.next([...this.aaddresss])
    })
  }
}
