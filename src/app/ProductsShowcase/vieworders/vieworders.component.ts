import { Component, OnInit } from '@angular/core';
import { MiscService } from 'src/app/Shared/misc.service';
import { UserService } from 'src/app/authentication/user.service';

@Component({
  selector: 'app-vieworders',
  templateUrl: './vieworders.component.html',
  styleUrls: ['./vieworders.component.css']
})
export class ViewordersComponent implements OnInit {

  constructor(public miscservice : MiscService,public userservice:UserService) { }
  public isdisplay = " "
  public orderdetails : any ;
  private token ;
  ngOnInit(): void {
    this.token = this.userservice.getdecodedtoken()
    this.miscservice.orderdetails(this.token.userid)
    this.miscservice.returnaddress().subscribe((res)=>{
      this.orderdetails = res
      console.log(this.orderdetails)
    })
  }
  showorderdetails(id){

    if (this.isdisplay == " "){
      this.isdisplay = id
    }
    else {
      this.isdisplay = " "
    }
  }

}
