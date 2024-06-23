import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { token_details } from '../interfaces/user.interface';

dotenv.config();

export interface extendedRequest extends Request {
    info?: token_details;
}

export const verifyToken = async (req: extendedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: 'You do not have access'
            });
        }

        const token = authHeader.split(' ')[1];

        const data = jwt.verify(token, process.env.SECRET_KEY as string) as token_details;

        req.info = data;

        next();
    } catch (error) {
        return res.status(403).json({
            error: 'Invalid or expired token'
        });
    }
};
