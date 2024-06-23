import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';

const bookingService = new BookingService();

export class BookingController {
    async bookTour(req: Request, res: Response) {
        try {
            const { userId, tourId } = req.body;
            const response = await bookingService.bookTour(userId, tourId);
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }
}
