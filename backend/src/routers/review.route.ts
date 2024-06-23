import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';

const controller = new ReviewController();
const review_router = Router();

review_router.post('/addReview', controller.addReview);
review_router.get('/getReviews/:tourId', controller.getReviewsForTour);

export default review_router;
