import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterUser } from "../models/registeruser.model";
import { map, of } from "rxjs";
import {environment} from '../environments/environment'; 

@Injectable({ providedIn: 'root' })
export class RegisterService {

constructor(private http: HttpClient) { }

registerUser(user: any) { 
        return this.http.post<any>(`${environment.apiUrl}/users/register`, user).pipe(map(user => {
            
            return user;                       
        }));
}

}