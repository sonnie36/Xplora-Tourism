import mssql from 'mssql';
import { sqlConfig } from '../config/sql.config';
import { v4 } from 'uuid';

export class ReviewService {
    async addReview(userId: string, tourId: string, reviewText: string, rating: number) {
        let pool = await mssql.connect(sqlConfig);

        let result = await pool.request()
            .input('id', v4())
            .input('userId', userId)
            .input('tourId', tourId)
            .input('reviewText', reviewText)
            .input('rating', rating)
            .execute('AddReview');

        if (result.rowsAffected[0] === 1) {
            return { message: 'Review added successfully' };
        } else {
            return { error: 'Unable to add review' };
        }
    }

    async getReviewsForTour(tourId: string) {
        let pool = await mssql.connect(sqlConfig);

        let result = await pool.request()
            .input('tourId', tourId)
            .execute('GetReviewsForTour');

        return result.recordset;
    }
}
