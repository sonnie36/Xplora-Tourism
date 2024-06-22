import { NextFunction, Request, Response } from 'express';
import { AdminService as MyAdminService } from '../services/admin.service';
import { Tour } from '../interfaces/tour.interface';


let adminService = new MyAdminService();

export function validateTour(req: Request, res: Response, next: NextFunction) {
    const { title, description, destination, duration, price, tourType, startDate, endDate, maxParticipants, availableSlots } = req.body;
    
    if (!title || !description || !destination || duration == null || price == null || !tourType || !startDate || !endDate || maxParticipants == null || availableSlots == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    next();
}

export class AdminController{
	
	async addTour(req:Request,res: Response){
        try{
        let { title, description,destination, duration, price, tourType, startDate, endDate, maxParticipants, availableSlots } = req.body;
        
        console.log(req.body)
        console.log("Request body:", req.body); 
        console.log("Title:", title); // Ensure title is not undefined
        let response=await adminService.createTour({
            title, description,destination, duration, price, tourType, startDate, endDate, maxParticipants, availableSlots
        });

        return res.json(response);

    }catch(error){
        return res.json({error})
    }
}
async updateTour(req: Request, res: Response) {
    try {
        const { id } = req.params; // Extract ID from URL params
        const { title, description, destination, duration, price, tourType, startDate, endDate, maxParticipants, availableSlots } = req.body as Tour;
       
        const response = await adminService.updateTour({
            id, title, description, destination, duration, price, tourType, startDate, endDate, maxParticipants, availableSlots
        });

        return res.json(response);
    } catch (error) {
        console.error('Error in updateTour controller:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
async softDeleteTour(req: Request, res: Response) {
    try {
        const { id } = req.params; // Extract ID from URL params


        const response = await adminService.softDeleteTour(id);

        return res.json(response);
    } catch (error) {
        console.error('Error in softDeleteTour controller:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
async getAllTours(req: Request, res: Response) {
    try {
        const response = await adminService.getAllTours();

        return res.json(response);
    } catch (error) {
        console.error('Error in getAllTours controller:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

}