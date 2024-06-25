import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/Auth.service';
import { extendedRequest } from '../middleware/auth.middleWare';

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
    async checkDetails(req: extendedRequest, res: Response) {
        try {
            if (req.info) {
                return res.status(200).json({
                    info: req.info
                });
            } else {
                return res.status(404).json({ error: "No details found" });
            }
        } catch (error) {
            console.error("Error occurred in checkDetails:", error);
            return res.status(500).json({ error: "An internal server error occurred" });
        }
    }
    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = await userService.deleteUser(id);
            return res.json(response);
        } catch (error) {
            return res.json({ error });
        }
    }
}
