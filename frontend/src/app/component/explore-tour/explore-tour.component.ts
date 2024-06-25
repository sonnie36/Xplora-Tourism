import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../services/tour-service.service';
import { BookingService } from '../../services/booking.service';
import { TourDetails, bookingDetails } from '../../interface/interfaces';

@Component({
  selector: 'app-explore-tour',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './explore-tour.component.html',
  styleUrls: ['./explore-tour.component.css']
})
export class ExploreTourComponent implements OnInit {
  tours: TourDetails[] = [];
  filteredTours: TourDetails[] = [];
  selectedTour: TourDetails | null = null;
  searchType: string = '';
  userId: string = '92b9a424-4da0-4457-b42b-f53d1b60e24a';  // Replace with actual user ID source
  showModal: boolean = false;

  constructor(private tourService: TourService, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours(): void {
    this.tourService.getTours().subscribe(tours => {
      this.tours = tours;
      this.filteredTours = tours;
    });
  }

  filterTours(): void {
    if (this.searchType) {
      this.tourService.getToursByType(this.searchType).subscribe(tours => {
        this.filteredTours = tours;
      });
    } else {
      this.loadTours();
    }
  }
  openBookingModal(tour: TourDetails): void {
    this.selectedTour = tour;
    this.showModal = true;
  }

  closeBookingModal(): void {
    this.showModal = false;
  }

  bookTour(): void {
    if (this.selectedTour) {
      const booking: bookingDetails = {
        userId: this.userId,
        tourId: this.selectedTour.id
      };
      this.bookingService.bookTour(booking).subscribe(response => {
        if (response.message) {
          alert(`Tour booked: ${this.selectedTour?.title}`);
        } else {
          alert(`Failed to book tour: ${response.error}`);
        }
        this.closeBookingModal();
      });
    }
  }
}
