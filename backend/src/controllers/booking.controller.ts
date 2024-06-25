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
    async getUserBookings(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const bookings = await bookingService.getUserBookings(userId);
            return res.json(bookings);
        } catch (error) {
            return res.json({ error });
        }
    }

    async cancelBooking(req: Request, res: Response) {
        try {
            const { bookingId } = req.body;
            const response = await bookingService.cancelBooking(bookingId);
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }

    async updateBookingStatus(req: Request, res: Response) {
        try {
            const { bookingId, status } = req.body;
            const response = await bookingService.updateBookingStatus(bookingId, status);
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }
}
