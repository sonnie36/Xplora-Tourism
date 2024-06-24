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
exports.AdminController = exports.validateTour = void 0;
const admin_service_1 = require("../services/admin.service");
let adminService = new admin_service_1.AdminService();
function validateTour(req, res, next) {
    const { title, description, destination, duration, price, tourType, startDate, endDate, maxParticipants, availableSlots, image } = req.body;
    if (!title || !description || !destination || duration == null || price == null || !tourType || !startDate || !endDate || maxParticipants == null || availableSlots == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    next();
}
exports.validateTour = validateTour;
class AdminController {
    addTour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Received request:', req.body);
                let { title, description, destination, duration, price, tourType, startDate, endDate, maxParticipants, availableSlots, image } = req.body;
                let response = yield adminService.createTour({
                    title, description, destination, duration, price, tourType, startDate, endDate, maxParticipants, availableSlots, image
                });
                return res.json(response);
            }
            catch (error) {
                return res.json({ error });
            }
        });
    }
    updateTour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params; // Ensure this is extracted from params
                const { title, description, destination, duration, price, tourType, startDate, endDate, maxParticipants, availableSlots, image } = req.body;
                const response = yield adminService.updateTour({
                    id, title, description, destination, duration, price, tourType, startDate, endDate, maxParticipants, availableSlots, image
                });
                return res.json(response);
            }
            catch (error) {
                console.error('Error in updateTour controller:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    softDeleteTour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield adminService.softDeleteTour(id);
                return res.json(response);
            }
            catch (error) {
                console.error('Error in softDeleteTour controller:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getAllTours(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield adminService.getAllTours();
                return res.json(response);
            }
            catch (error) {
                console.error('Error in getAllTours controller:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getToursByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tourType } = req.params;
                const response = yield adminService.getToursByType(tourType);
                return res.json(response);
            }
            catch (error) {
                return res.json({ error });
            }
        });
    }
}
exports.AdminController = AdminController;
