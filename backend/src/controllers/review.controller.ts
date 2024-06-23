import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';

const reviewService = new ReviewService();

export class ReviewController {
    async addReview(req: Request, res: Response) {
        try {
            const { userId, tourId, reviewText, rating } = req.body;
            const response = await reviewService.addReview(userId, tourId, reviewText, rating);
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }

    async getReviewsForTour(req: Request, res: Response) {
        try {
            const { tourId } = req.params;
            const response = await reviewService.getReviewsForTour(tourId);
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }
}
