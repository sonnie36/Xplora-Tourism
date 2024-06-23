"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controllers/booking.controller");
const controller = new booking_controller_1.BookingController();
const booking_router = (0, express_1.Router)();
booking_router.post('/bookTour', controller.bookTour);
exports.default = booking_router;
