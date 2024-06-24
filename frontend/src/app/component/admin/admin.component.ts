import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour-service.service';
import { TourDetails } from '../../interface/interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  
  tours: TourDetails[] = [];
  newTour: TourDetails = {
    id: '',
    title: '',
    description: '',
    destination: '',
    duration: 0,
    price: 0,
    tourType: '',
    startDate: '',
    endDate: '',
    maxParticipants: 0,
    availableSlots: 0,
    image: ''
  };
  selectedTour: TourDetails | null = null;
  showAddTourForm = false;
  showUpdateTourForm = false;
  successMessage = '';
  errorMessage = '';

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours(): void {
    this.tourService.getTours().subscribe(tours => {
      this.tours = tours;
    });
  }

  toggleAddTourForm(): void {
    this.showAddTourForm = !this.showAddTourForm;
    this.successMessage = '';
    this.errorMessage = '';
  }

  addTour(): void {
    this.tourService.addTour(this.newTour).subscribe(
      tour => {
        this.tours.push(tour);
        this.newTour = {
          id: '',
          title: '',
          description: '',
          destination: '',
          duration: 0,
          price: 0,
          tourType: '',
          startDate: '',
          endDate: '',
          maxParticipants: 0,
          availableSlots: 0,
          image: ''
        };
        this.showAddTourForm = false;
        this.successMessage = 'Tour added successfully!';
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = 'Error adding tour. Please try again.';
        this.successMessage = '';
      }
    );
  }

  editTour(tour: TourDetails): void {
    this.selectedTour = { ...tour };
    this.showUpdateTourForm = true;
  }

  saveUpdatedTour(): void {
    if (this.selectedTour) {
      this.tourService.updateTour(this.selectedTour.id, this.selectedTour).subscribe(
        updatedTour => {
          const index = this.tours.findIndex(t => t.id === updatedTour.id);
          if (index !== -1) {
            this.tours[index] = updatedTour;
          }
          this.showUpdateTourForm = false;
          this.successMessage = 'Tour updated successfully!';
          this.errorMessage = '';
        },
        error => {
          this.errorMessage = 'Error updating tour. Please try again.';
          this.successMessage = '';
        }
      );
    }
  }

  confirmDeleteTour(id: string): void {
    if (confirm('Are you sure you want to delete this tour?')) {
      this.deleteTour(id);
    }
  }

  deleteTour(id: string): void {
    this.tourService.deleteTour(id).subscribe(
      () => {
        this.tours = this.tours.filter(tour => tour.id !== id);
        this.successMessage = 'Tour deleted successfully!';
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = 'Unable to delete tour. Please try again.';
        this.successMessage = '';
      }
    );
  }
}
