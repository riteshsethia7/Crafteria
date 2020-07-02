import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { SellerService } from 'src/app/authentication/seller.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  constructor(private router: Router , private sellerserivec : SellerService) { }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
        this.outlet.deactivate();
    });
  }
  onlogout(){
    this.sellerserivec.logout()
    this.router.navigateByUrl('/user/home/displayproduct');
  }
  }

