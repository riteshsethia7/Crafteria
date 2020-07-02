import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, public router: Router) {}
  private token: string;
  private userdata ;
  private tokentimer : any ;
  private usersup = new Subject<any>();
  public authlistner = new Subject<boolean>();
  public isuserauth = false;
  public serverurl = ' http://localhost:3000/server';
  registeruser(form: any) {
    const user = {
      name: form.value.fname,
      email: form.value.email,
      password: form.value.password,
    };
    this.http
      .post<any>(this.serverurl + '/registeruser', user)
      .subscribe((res) => {});
  }

  loginuser(form: any) {
    const user = {
      email: form.value.email,
      password: form.value.password,
    };
    this.http
      .post<{ token: string ,expiresin : number}>(this.serverurl + '/loginuser', user)
      .subscribe((res) => {
        this.token = res.token;
        if(this.token){
        const expiresin = res.expiresin
        this.setauthtimer(expiresin)
        this.authlistner.next(true);
        const now = new Date()
        const expirataiondate = new Date(now.getTime() + expiresin *1000)
        this.isuserauth = true;
        this.saveauthdata(this.token,expirataiondate)
        this.router.navigateByUrl('/user/home/displayproduct');
        }
      });
  }

  getdecodedtoken() {
    return jwt_decode(this.token);
  }
  gettoken() {
    return this.token;
  }
  getauthstatus() {
    return this.authlistner.asObservable();
  }

  logout() {
    this.token = null;
    this.isuserauth = false;
    this.authlistner.next(false);
    clearTimeout(this.tokentimer)
    this.clearauthdata();
  }

  getuserdata(userid){
    let param = new HttpParams();
    param = param.append('id',userid);
    this.http.get<any>(this.serverurl+'/getuserdata',{params:param}).subscribe((res)=>{
      this.userdata = res.userdata
      this.usersup.next([...this.userdata]);
    })
  }

  usersupdateddata(){
    return this.usersup.asObservable()
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

  autoauthuser(){
    const authinfo = this.getauthdata()
    const now = new Date();
    const expiresin = authinfo.expirataiondate.getTime()  - now.getTime() ;
    if (expiresin > 0){
      this.token = authinfo.token
      this.isuserauth = true;
      this.setauthtimer(expiresin/1000)
      this.authlistner.next(true);
    }
  }
  private setauthtimer(duration){
    this.tokentimer=setTimeout(()=> {
      this.logout()
    },duration *1000)
  }
}
