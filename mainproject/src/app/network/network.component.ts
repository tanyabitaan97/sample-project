import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from './network.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  constructor(private networkService:NetworkService, private route:ActivatedRoute) {}

  friendsList:any[]=[];

  @Input() 
  connectionsList:any[]=[];

  ngOnInit(): void {

    let emailId = this.route.snapshot.paramMap.get('emailId');

    this.networkService.getAllUsersAsFriends().subscribe((x:any)=>{

      x.filter((y:any)=>{
        if(y.emailId!=emailId) {
          this.friendsList.push(y);
        };
      })
      
    });

    this.connectionsList.forEach((y:any)=>{
      console.log(y.emailId)
        this.friendsList.forEach((z:any)=>{
          console.log(z.emailId+' '+y.emailId)
          if(z.emailId==y.friendName) {
            z.status=y.status;
          }
        })
    });

    console.log('this.connections list '+JSON.stringify(this.friendsList));
    
  }

  updateFriend(emailId:any) {

    let obj={'emailId':emailId,'status':'Request Pending'};

    this.networkService.updateFriendByStatus(obj).subscribe((z:any)=>{
      this.friendsList.forEach((z:any)=>{
        if(z.emailId==emailId) {
          z.status='Request Pending';
        }
    });
    });

  
  }

}
