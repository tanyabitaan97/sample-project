import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterUser } from "../models/registeruser.model";
import { map, of } from "rxjs";
import {environment} from '../environments/environment'; 

@Injectable({ providedIn: 'root' })
export class NetworkService {

constructor(private http: HttpClient) { }

getAllUsersAsFriends() { 
    return this.http.get<any>(`${environment.apiUrl}/users`).pipe(map(user => {
        return user;                       
    }));
}

updateFriendByStatus(friend:any) {
    return this.http.put<any>(`${environment.apiUrl}/friends/update`,friend).pipe(map(user => {
        return user;                       
    }));
}

}