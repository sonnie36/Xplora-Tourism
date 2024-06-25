import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour-service.service';
  // Import UserService
import { TourDetails, User } from '../../interface/interfaces';  // Import User and TourDetails interfaces
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,UserDetailsComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  tours: TourDetails[] = [];
   // Flag to control user display
  currentSection: string = 'tours'; // Flag to control which section is displayed

  // Tour details initialization
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

  selectedTour: TourDetails = {
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

  showAddTourForm = false;
  showUpdateTourForm = false;
  successMessage = '';
  errorMessage = '';

  constructor(private tourService: TourService) {}  // Inject UserService

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

  closeUpdateTourForm(): void {
    this.showUpdateTourForm = false;
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

  // Method to fetch and display users

}
