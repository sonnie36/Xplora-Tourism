"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const controller = new admin_controller_1.AdminController();
const admin_router = (0, express_1.Router)();
admin_router.post('/addTour', controller.addTour);
admin_router.put('/updateTour/:id', controller.updateTour);
admin_router.delete('/softDeleteTour/:id', controller.softDeleteTour); // Added '/' before :id
admin_router.get('/getTours', controller.getAllTours);
admin_router.get('/getToursByType/:tourType', controller.getToursByType);
exports.default = admin_router;
