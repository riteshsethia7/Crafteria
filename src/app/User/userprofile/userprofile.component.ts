import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/authentication/user.service';
import { MiscService } from 'src/app/Shared/misc.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private userservice : UserService,private  misc:MiscService) { }

  public usertoken = this.userservice.getdecodedtoken()
  public userdata;
  public isadd = false
  public address = [];
  ngOnInit(): void {
    this.userservice.getuserdata(this.usertoken.userid)
    this.userservice.usersupdateddata().subscribe((res)=>{
      this.userdata = res ;
    })
    this.misc.getaddress(this.usertoken.userid)
    this.misc.returnaddress().subscribe((res)=>{
      this.address = res
    })
  }

}
