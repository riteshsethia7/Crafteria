import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SellerService } from '../seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sellerregister',
  templateUrl: './sellerregister.component.html',
  styleUrls: ['./sellerregister.component.css'],
})
export class SellerregisterComponent implements OnInit {
  constructor(public service: SellerService,private router : Router) {}

  ngOnInit(): void {}
  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.service.registerseller(form);
    this.router.navigateByUrl('/seller/login')
  }
}
