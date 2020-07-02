import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient,private router:Router) {}
  public sellerauthenticated = false ;
  private token :string ;
  public tokentimer : any ;
  public sellerdata : any;
  public dataup = new Subject<any>()
  private authlistner = new Subject<boolean>();
  public serverurl = ' http://localhost:3000/server';

  //Register  a seller on the database
  registerseller(form: any) {
    const seller = {
      name: form.value.fname,
      email: form.value.email,
      password: form.value.password,
      phoneno: form.value.phoneno,
      Aadharno: form.value.Aadharno,
    };
    this.http
      .post<any>(this.serverurl + '/registerseller', seller)
      .subscribe((res) => {
        console.log(res);
      });
  }

  // Login a seller
  loginseller(form: any) {
    const seller = {
      email: form.value.email,
      password: form.value.password,
    };
    this.http.post<{token:string,expiresin:any}>(this.serverurl + '/loginseller', seller).subscribe((res) => {
      this.token = res.token;
      if(this.token){
        const expiresin =  res.expiresin
        this.setauthtimer(expiresin)
        this.authlistner.next(true);
        this.sellerauthenticated = true ;
        const now = new Date()
        const expirataiondate = new Date(now.getTime() + expiresin *1000)
        this.saveauthdata(this.token,expirataiondate)
        this.router.navigateByUrl('/seller');
    }});
  }

  // Get User data
  getsellerdata(sellerid){
    let param = new HttpParams()
    param = param.append('id',sellerid)
    this.http.get<any>(this.serverurl+'/sellerdata',{params:param}).subscribe(res=>{
      this.sellerdata = [res.data]
      this.dataup.next([...this.sellerdata])
    })
  }

  sellerdataobservable(){
    return this.dataup.asObservable()
  }

  issellerauth(){
    return this.sellerauthenticated ;
  }


  gettoken(){
    return this.token ;
  }

  getdecodedtoken(){
    return jwt_decode(this.token) ;
  }

  getauthstatus(){
    return this.authlistner.asObservable();
  }

  logout(){
    this.token = null ;
    this.sellerauthenticated = false ;
    this.authlistner.next(false);
    clearTimeout(this.tokentimer)
    this.clearauthdata();
  }

  private saveauthdata(token :string,expirationdate : Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationdate.toISOString());

  }

  private clearauthdata(){
    localStorage.removeItem('token') ;
    localStorage.removeItem('expiration')

  }
  private getauthdata(){
    const token = localStorage.getItem('token');
    const expirydate = localStorage.getItem('expiration');
    if (!token || !expirydate){
      return
    }
    return {
      token:token,
      expirataiondate : new Date(expirydate)
    }
  }

  public autoauthseller(){
    const authinfo = this.getauthdata()
    const now = new Date();
    const expiresin = authinfo.expirataiondate.getTime()  - now.getTime() ;
    if (expiresin > 0){
      this.token = authinfo.token
      this.setauthtimer(expiresin/1000)
      this.authlistner.next(true);
      this.sellerauthenticated = true ;
    }
  }
  private setauthtimer(duration){
    this.tokentimer=setTimeout(()=> {
      this.logout()
    },duration *1000)
  }
}
