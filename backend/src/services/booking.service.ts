import mssql from 'mssql';
import { sqlConfig } from '../config/sql.config';
import { v4 } from 'uuid';

export class BookingService {
    async bookTour(userId: string, tourId: string) {
        let pool = await mssql.connect(sqlConfig);

        let result = await pool.request()
            .input('id', v4())
            .input('userId', userId)
            .input('tourId', tourId)
            .execute('BookTour');

        if (result.rowsAffected[0] === 1) {
            return { message: 'Tour booked successfully' };
        } else {
            return { error: 'Unable to book tour' };
        }
    }
    async getUserBookings(userId: string) {
        let pool = await mssql.connect(sqlConfig);

        let result = await pool.request()
            .input('userId', userId)
            .query('SELECT * FROM bookings WHERE userId = @userId');

        return result.recordset;
    }

    async cancelBooking(bookingId: string) {
        let pool = await mssql.connect(sqlConfig);

        let result = await pool.request()
            .input('id', bookingId)
            .query('DELETE FROM bookings WHERE id = @id');

        if (result.rowsAffected[0] === 1) {
            return { message: 'Booking canceled successfully' };
        } else {
            return { error: 'Unable to cancel booking' };
        }
    }

    async updateBookingStatus(bookingId: string, status: string) {
        let pool = await mssql.connect(sqlConfig);

        let result = await pool.request()
            .input('id', bookingId)
            .input('status', status)
            .query('UPDATE bookings SET status = @status WHERE id = @id');

        if (result.rowsAffected[0] === 1) {
            return { message: 'Booking status updated successfully' };
        } else {
            return { error: 'Unable to update booking status' };
        }
    }
}
