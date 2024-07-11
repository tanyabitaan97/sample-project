import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterUser } from "../models/registeruser.model";
import { map, of } from "rxjs";
import {environment} from '../environments/environment'; 

@Injectable({ providedIn: 'root' })
export class SettingsService {

constructor(private http: HttpClient) { }

getProfiles() { 
        return this.http.get<any>(`${environment.apiUrl}/users/details`).pipe(map(user => {
            return user;                       
        }));
}

updateUserById(user:any) {
   
    return this.http.put<any>(`${environment.apiUrl}/user/byId`,user).pipe(map(user => {
        return user;                       
    }));

}

}