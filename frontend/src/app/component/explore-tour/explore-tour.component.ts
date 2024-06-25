import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../services/tour-service.service';
import { TourDetails } from '../../interface/interfaces';

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

  constructor(private tourService: TourService) {}

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

  openBookingModal(content: any, tour: TourDetails): void {
    this.selectedTour = tour;
   
  }

  bookTour(): void {
    // Implement booking logic here
    alert(`Tour booked: ${this.selectedTour?.title}`);
    
  }
}
