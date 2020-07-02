import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SellerService } from '../seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sellerlogin',
  templateUrl: './sellerlogin.component.html',
  styleUrls: ['./sellerlogin.component.css']
})
export class SellerloginComponent implements OnInit {

  constructor(private service:SellerService, private router : Router) { }

  ngOnInit(): void {
  }
  onLogin(form:NgForm){
    if (form.invalid){
      return
    }
    this.service.loginseller(form);
    if (this.service.issellerauth) {
      this.router.navigateByUrl('/seller');
    }
    }
  }

