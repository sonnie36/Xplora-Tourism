export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    profilePhoto?: string;
    firstName: string;
    lastName: string;
    createdAt?: string;
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
    image:string
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
export interface token_details{
  info?:{
    id:string,
    username:string,
    email:string,
    firstName:string,
    profilePhoto?:string

  }
  error?:{
    message:string
  }
}
export interface login_details{
  email:string,
  password:string
}
export interface bookingDetails{
  userId:string
  tourId: string
  bookingDate?: string;
  status?: string;
}