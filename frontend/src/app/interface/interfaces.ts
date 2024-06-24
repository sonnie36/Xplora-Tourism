export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    profilePhoto?: string;
    firstName: string;
    lastName: string;
  }
  
  export interface TourDetails {
    id:string,
    title: string;
    description: string;
    destination: string;
    duration: number;
    price: number;
    tourType: string;
    startDate: string;
    endDate: string;
    maxParticipants: number;
    availableSlots: number;
    image?:string
  }
export interface UpdateTour{
    id: string;
    title: string;
    description: string;
    destination: string;
    duration: number;
    price: number;
    tourType: string;
    startDate: string;
    endDate: string;
    maxParticipants: number;
    availableSlots: number;
    image?: string;
  
}