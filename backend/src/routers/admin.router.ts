import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";

const controller = new AdminController();
const admin_router = Router();

admin_router.post('/addTour', controller.addTour);
admin_router.put('/updateTour/:id', controller.updateTour);
admin_router.delete('/softDeleteTour/:id', controller.softDeleteTour);  // Added '/' before :id
admin_router.get('/getTours', controller.getAllTours);
admin_router.get('/getToursByType/:tourType', controller.getToursByType);


export default admin_router;
