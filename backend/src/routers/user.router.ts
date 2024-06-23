import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth.middleWare';

const controller = new UserController();
const user_router = Router();

user_router.post('/addUser', controller.addUser);
user_router.put('/updateUser/:id', controller.updateUser);
user_router.get('/getUsers', verifyToken, controller.getAllUsers);
user_router.post('/login', controller.login);
user_router.put('/resetPassword/:id', verifyToken, controller.resetPassword);

export default user_router;
