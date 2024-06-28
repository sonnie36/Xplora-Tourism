import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { token_details } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private userIdKey = 'userId';
  private apiUrl = 'http://localhost:3000'; // Update with your actual API URL

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  getUserId(): string {
    return localStorage.getItem(this.userIdKey) || '';
  }

  login(details: { email: string, password: string }): Observable<any> {
    return this.http.post<{ message?: string, token?: string, error?: string }>(`${this.apiUrl}/login`, details).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.fetchUserDetails(response.token).subscribe();
        }
      })
    );
  }

  fetchUserDetails(token: string): Observable<token_details> {
    const headers = new HttpHeaders({ 'token': token });
    return this.http.get<token_details>(`${this.apiUrl}/checkDetails`, { headers }).pipe(
      tap(details => {
        if (details.info?.id) {
          localStorage.setItem(this.userIdKey, details.info.id);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
  }
}
