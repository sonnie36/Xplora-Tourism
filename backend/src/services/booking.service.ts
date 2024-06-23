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
}
