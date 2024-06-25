import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { bookingDetails } from '../../interface/interfaces';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: bookingDetails[] = [];
  userId: string = '92b9a424-4da0-4457-b42b-f53d1b60e24a';  // Replace with actual user ID source

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(): void {
    this.bookingService.getUserBookings(this.userId).subscribe(bookings => {
      this.bookings = bookings;
    });
  }
}
