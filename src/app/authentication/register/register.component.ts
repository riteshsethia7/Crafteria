import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public registerservice:UserService,private router: Router,private snackbar : MatSnackBar) { }

  ngOnInit(): void {
  }
  onRegister(form:NgForm){
    if(form.invalid){
      this.snackbar.open("Invalid Details",'Re-enter !')
      return;
    }
    else{
    this.registerservice.registeruser(form);
    this.router.navigateByUrl('/user/login')
  }}
}
