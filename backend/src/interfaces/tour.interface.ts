export interface Tour {   
    id?: string;        
    title: string;            
    description: string;  
    destination: string;          
    duration: number;        
    price: number;            
    tourType: string;         
    startDate: Date;          
    endDate: Date;            
    maxParticipants: number;  
    availableSlots: number;         
}
