import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  @Input() 
  connectionsList:any[]=[];

  ngOnInit(): void {

    this.connectionsList = this.connectionsList.filter((x:any)=>{
      if(x.status=='Friend') {
        return x;
      }
    })
    
  }

  constructor() { }



}
