import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const controller = new UserController();
const user_router = Router();

user_router.post('/addUser', controller.addUser);

export default user_router;