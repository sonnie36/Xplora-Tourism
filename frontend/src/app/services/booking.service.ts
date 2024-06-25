import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bookingDetails } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:3000/booking';

  constructor(private http: HttpClient) { }

  bookTour(book: bookingDetails): Observable<any> {
    const url = `${this.baseUrl}/bookTour`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, book, { headers });
  }

  getUserBookings(userId: string): Observable<any> {
    const url = `${this.baseUrl}/userBookings/${userId}`;
    return this.http.get<any>(url);
  }

  cancelBooking(bookingId: string): Observable<any> {
    const url = `${this.baseUrl}/cancelBooking`;
    const body = { bookingId };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, body, { headers });
  }

  updateBookingStatus(bookingId: string, status: string): Observable<any> {
    const url = `${this.baseUrl}/updateBookingStatus`;
    const body = { bookingId, status };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, body, { headers });
  }
}
