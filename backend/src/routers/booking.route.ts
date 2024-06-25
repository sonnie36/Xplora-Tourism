import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';

const controller = new BookingController();
const booking_router = Router();

booking_router.post('/bookTour', controller.bookTour);
booking_router.get('/userBookings/:userId', controller.getUserBookings);
booking_router.post('/cancelBooking', controller.cancelBooking);
booking_router.put('/updateBookingStatus', controller.updateBookingStatus);


export default booking_router;
