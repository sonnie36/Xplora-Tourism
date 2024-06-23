import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

let userService = new UserService();

export class UserController {
    async addUser(req: Request, res: Response) {
        try {
            let { username, email, password, role, profilePhoto, firstName, lastName } = req.body;
            let response = await userService.createUser({
                username,
                email,
                password,
                role,
                profilePhoto,
                firstName,
                lastName
            });
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            let { id } = req.params;

            const { username, email, password, role, profilePhoto, firstName, lastName } = req.body;
            let response = await userService.updateUser({
                id,
                username,
                email,
                password,
                role,
                profilePhoto,
                firstName,
                lastName
            });
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            let response = await userService.getAllUsers();
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }
}
