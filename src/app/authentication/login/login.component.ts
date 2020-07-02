import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userservice : UserService,private router:Router) { }

  public errormessage = 'none' ;
  ngOnInit(): void {
    if(this.userservice.isuserauth){
      this.router.navigateByUrl('/user/home/displayproduct')
    }
  }
  onLogin(form:NgForm){
    this.userservice.loginuser(form);
    if (this.userservice.isuserauth){
    }
    else {
      this.errormessage = 'Incorrect Email / Password'
    }
  }
}
