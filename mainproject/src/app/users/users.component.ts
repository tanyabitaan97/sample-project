import { Component, OnInit } from '@angular/core';
import { UserService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersList:any[]=[];

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe((x:any)=>{
        this.usersList=x;
    });
    
  }

  constructor(private userService:UserService) { }

  updateUser(user:any) {

    user.status='block';

    this.userService.updateUser(user).subscribe((x:any)=>{
        this.usersList.forEach((x:any)=>{
            if(x.emailId==user.emailId) {
                x.status='block';
            }
        });
    });

  }

}
