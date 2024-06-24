import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/addUser`, user);
  }

  loginUser(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<{message?:string,token?:string,error?:string}>(`${this.apiUrl}/login`, credentials);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getUsers`);
  }

  resetPassword(newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/resetPassword`, { newPassword });
  }
  // checketails(token:string){
  //   return this.http.post(`${this.apiUrl}/checkToken`,{token});
  //   headers:{
  //     'token': token;
  //   }
  // }
}
