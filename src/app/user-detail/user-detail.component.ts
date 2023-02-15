import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{


  
  public userId!:number;
  userDetails!:User

  constructor(
    private activetedRoute: ActivatedRoute,
    private api: ApiService) {}
  ngOnInit(): void {
    this.activetedRoute.params.subscribe(val=>{
      this.userId=val['id'];
      this.fetchUserDetails(this.userId);
    })
  }


  fetchUserDetails(userID:number){
    this.api.getRegisteredUserId(userID)
    .subscribe(res=>{
      this.userDetails=res;
    })
  }
}
