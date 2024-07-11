import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterUser } from "../models/registeruser.model";
import { map, of } from "rxjs";
import {environment} from '../environments/environment'; 

@Injectable({ providedIn: 'root' })
export class UserService {

constructor(private http: HttpClient) { }

getAllUsers() {
    return this.http.get<any>(`${environment.apiUrl}'/users`).pipe(map(user => {
        return user;                       
    }));
}

updateUser(user:any) {
    
    return this.http.put<any>(`${environment.apiUrl}'/user/byId`,user).pipe(map(user => {
        return user;                       
    }));
    
}

}