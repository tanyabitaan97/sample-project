import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-homecomponent',
  templateUrl: './homecomponent.component.html',
  styleUrls: ['./homecomponent.component.scss']
})
export class HomecomponentComponent implements OnInit {

  userPhoto:any;

  posts:any[]=[];

  post:any;

  isHome:any;
  isNetwork:any;
  isFriend:any;
  isSettings:any;
  isUser:any;

  connections:any=0;

  role:any;

  friendList:any[]=[];

  constructor(private route: ActivatedRoute, 
    private homeService:HomeService,
    private authenticationService:AuthenticationService){}

  ngOnInit(): void {
    this.isHome=true;

    let emailId = this.route.snapshot.paramMap.get('emailId');

    let obj= {"emailId":emailId};

    this.homeService.getUserByEmailId(obj).subscribe((x:any)=>{
       this.userPhoto = x.userPhoto;
       this.role=x.role;
    });

    this.homeService.getPostByEmailId(obj).subscribe((x:any)=>{
      x.forEach((y:any)=>{
        this.posts.push(y.post);
      })
    });

    this.homeService.getConnectionsAsFriends(obj).subscribe((x:any)=>{
      this.friendList=x;
       x.forEach((y:any)=>{
        if(y.status=='Friend') {
          this.connections+=1;
        }
       })
    });
    
  }

  doTextareaValueChange(ev:any) {
    this.post=ev?.target.value;
  }

  createPost() {
    let emailId = this.route.snapshot.paramMap.get('emailId');
    let obj={"emailId":emailId,"post":this.post};
    this.homeService.createPost(obj).subscribe((x:any)=>{
      this.homeService.getPostByEmailId(obj).subscribe((x:any)=>{
        this.posts=[];
        x.forEach((y:any)=>{
          this.posts.push(y.post);
        })
      });
    })
  }

  logout() {
    this.authenticationService.logout();
    

  }

  homeValue() {
    this.isHome=true;
    this.isNetwork=false;
    this.isFriend=false;
    this.isSettings=false;
    this.isUser=false;
  }

  networkValue() {
    this.isHome=false;
    this.isNetwork=true;
    this.isFriend=false;
    this.isSettings=false;
    this.isUser=false;
  }

  friendValue() {
    this.isHome=false;
    this.isNetwork=false;
    this.isFriend=true;
    this.isSettings=false;
    this.isUser=false;
  }

  settingsValue() {
    this.isHome=false;
    this.isNetwork=false;
    this.isFriend=false;
    this.isSettings=true;
    this.isUser=false;
  }

  usersValue() {
    this.isHome=false;
    this.isNetwork=false;
    this.isFriend=false;
    this.isSettings=false;
    this.isUser=true;
  }

}
