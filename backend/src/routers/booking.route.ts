import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';

const controller = new BookingController();
const booking_router = Router();

booking_router.post('/bookTour', controller.bookTour);

export default booking_router;
