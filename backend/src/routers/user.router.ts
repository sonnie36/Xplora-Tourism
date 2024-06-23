import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const controller = new UserController();
const user_router = Router();

user_router.post('/addUser', controller.addUser);
user_router.put('/updateUser/:id', controller.updateUser);
user_router.get('/getUsers', controller.getAllUsers);

export default user_router;
