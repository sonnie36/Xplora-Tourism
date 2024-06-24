import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TourDetails } from '../interface/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TourService {
  private apiUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {}

  addTour(tour: TourDetails): Observable<TourDetails> {
    return this.http.post<TourDetails>(`${this.apiUrl}/addTour`, tour);
  }

  updateTour(id: string, tour: TourDetails): Observable<TourDetails> {
    return this.http.put<TourDetails>(`${this.apiUrl}/updateTour/${id}`, tour);
  }

  deleteTour(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/softDeleteTour/${id}`);
  }

  getTours(): Observable<TourDetails[]> {
    return this.http.get<TourDetails[]>(`${this.apiUrl}/getTours`);
  }

  getToursByType(type: string): Observable<TourDetails[]> {
    return this.http.get<TourDetails[]>(`${this.apiUrl}/getToursByType/${type}`);
  }
}
