"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_service_1 = require("../services/review.service");
const reviewService = new review_service_1.ReviewService();
class ReviewController {
    addReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, tourId, reviewText, rating } = req.body;
                const response = yield reviewService.addReview(userId, tourId, reviewText, rating);
                return res.json(response);
            }
            catch (error) {
                return res.json({ error });
            }
        });
    }
    getReviewsForTour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tourId } = req.params;
                const response = yield reviewService.getReviewsForTour(tourId);
                return res.json(response);
            }
            catch (error) {
                return res.json({ error });
            }
        });
    }
}
exports.ReviewController = ReviewController;
