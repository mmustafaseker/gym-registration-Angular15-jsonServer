import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/enquiry';
  constructor(private httt: HttpClient) {}

  postRegistration(registerObj:User){
    return this.httt.post<User>(`${this.baseUrl}`,registerObj);
  }

  getRegisteredUser(){
    return this.httt.get<User[]>(`${this.baseUrl}`);
  }

  updateRegisterUser(registerObj:User,id:number){
    return this.httt.put<User>(`${this.baseUrl}/${id}`,registerObj);
  }

  deleteRegisteredUser(id:number){
    return this.httt.delete<User>(`${this.baseUrl}/${id}`);
  }

  getRegisteredUserId(id:number){
    return this.httt.get<User>(`${this.baseUrl}/${id}`);
  }
}
