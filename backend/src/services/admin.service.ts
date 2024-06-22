import mssql from 'mssql'
import { sqlConfig } from '../config/sql.config'
import { v4 } from 'uuid'
import { Tour } from '../interfaces/tour.interface'

export class AdminService{
    async createTour(tour:Tour){
        
            let pool = await mssql.connect(sqlConfig)
            console.log(tour.title);
            console.log("Tour object:", tour);
            
            let result = await (await pool.request()
                .input('id', v4())
                .input('title', tour.title)
                .input('description', tour.description)
                .input('destination', tour.destination)
                .input('duration', tour.duration)
                .input('price', tour.price)
                .input('tourType', tour.tourType)
                .input('startDate', tour.startDate)
                .input('endDate', tour.endDate)
                .input('maxParticipants', tour.maxParticipants)
                .input('availableSlots', tour.availableSlots)
                .execute("AddTour")).rowsAffected;
                
                if (result[0] == 1) {
                    return {
                        message: "Account created successfully"
                    };
                } else {
                    return {
                        error: "Unable to create Account"
                    };
                }
            } 

            async updateTour(tour: Tour) {
                try {
                    const pool = await mssql.connect(sqlConfig);
                    
                    const result = await pool.request()
                        .input('id', tour.id)  
                        .input('title', tour.title)
                        .input('description', tour.description)
                        .input('destination', tour.destination)
                        .input('duration', tour.duration)
                        .input('price', tour.price)
                        .input('tourType', tour.tourType)
                        .input('startDate', tour.startDate)
                        .input('endDate', tour.endDate)
                        .input('maxParticipants', tour.maxParticipants)
                        .input('availableSlots', tour.availableSlots)
                        .execute('UpdateTour');
        
                    if (result.rowsAffected[0] === 1) {
                        return { message: 'Tour updated successfully' };
                    } else {
                        return { error: 'Unable to update tour' };
                    }
                } catch (error) {
                    console.error('Error updating tour:', error);
                    throw error;
                }
            }
            
            async softDeleteTour(id: string) {
                try {
                    const pool = await mssql.connect(sqlConfig);
        
                    const result = await pool.request()
                        .input('id', id)
                        .execute('SoftDeleteTour');
        
                    if (result.rowsAffected[0] === 1) {
                        return { message: 'Tour deleted successfully' };
                    } else {
                        return { error: 'Unable to delete tour' };
                    }
                } catch (error) {
                    console.error('Error deleting tour:', error);
                    throw error;
                }
            }

        async getAllTours(){
            try{
                let pool = mssql.connect(sqlConfig)
                const result =  (await pool).request()
                .execute('GetAllTours')
            }
            catch(error){
                console.error('Error getting all tours:', error);
                throw error;
            }
        }

            
        }
       
    
