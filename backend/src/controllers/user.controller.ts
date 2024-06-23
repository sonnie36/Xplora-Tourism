import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/Auth.service';

const userService = new UserService();
const authService = new AuthService();

export class UserController {
    async addUser(req: Request, res: Response) {
        try {
            const { username, email, password, role, profilePhoto, firstName, lastName } = req.body;
            const response = await userService.createUser({ username, email, password, role, profilePhoto, firstName, lastName });
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { username, email, password, role, profilePhoto, firstName, lastName } = req.body;
            const response = await userService.updateUser({ id, username, email, password, role, profilePhoto, firstName, lastName });
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const response = await userService.getAllUsers();
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const response = await authService.login({ email, password });
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { newPassword } = req.body;
            const response = await authService.resetPassword(id, newPassword);
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }
}
