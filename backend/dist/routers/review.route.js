"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const controller = new review_controller_1.ReviewController();
const review_router = (0, express_1.Router)();
review_router.post('/addReview', controller.addReview);
review_router.get('/getReviews/:tourId', controller.getReviewsForTour);
exports.default = review_router;
