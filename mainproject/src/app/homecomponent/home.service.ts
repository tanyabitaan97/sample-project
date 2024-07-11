import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterUser } from "../models/registeruser.model";
import { map, of } from "rxjs";
import {environment} from '../environments/environment'; 

@Injectable({ providedIn: 'root' })
export class HomeService {

constructor(private http: HttpClient) { }

getUserByEmailId(user: any) { 
    return this.http.post<any>(`${environment.apiUrl}/findUserByEmailId`, user).pipe(map(user => {
        return user;                       
    }));
}

getPostByEmailId(user:any) {
    return this.http.post<any>(`${environment.apiUrl}/postByUserId`, user).pipe(map(user => {
        console.log('user post are '+JSON.stringify(user));
        return user;                       
    }));
}

createPost(post:any) {

    return this.http.post<any>(`${environment.apiUrl}/posts/createpost`, post).pipe(map(message => {
        return message;                       
    }));

}

getConnectionsAsFriends(email:any) {
   
    return this.http.post<any>(`${environment.apiUrl}/friends/getFriendsByUserId`, email).pipe(map(users => {
        return users;                       
    }));

}

}