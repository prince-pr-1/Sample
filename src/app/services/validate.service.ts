import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  api = "http://localhost:3000/users";

  constructor(private http: HttpClient) {}

  //  Register validation

  checkEmail(email: string){
    return this.http.get<[]>(this.api+"?email="+email);
  }

  //  User insertion

  insertUser(user: User){
    return this.http.post(this.api, user);
  }

  //  User login
  loginUser(email: string, pass: string): Observable<User []>{
    return this.http.get<User []>(this.api+'?email='+email+'&password='+pass);
  }

}
