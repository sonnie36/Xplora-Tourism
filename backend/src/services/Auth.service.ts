import mssql from 'mssql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { login_details } from '../interfaces/user.interface';
import { sqlConfig } from '../config/sql.config';

export class AuthService {
    async login(logins: login_details) {
        const pool = await mssql.connect(sqlConfig);

        const user = (await pool.request()
            .input('email', logins.email)
            .execute('GetUserByEmail')).recordset;

        if (user.length < 1) {
            return { error: 'User not found' };
        }

        const hashedPassword = user[0].password;
        const passwordMatches = bcrypt.compareSync(logins.password, hashedPassword);

        if (passwordMatches) {
            const { password, ...rest } = user[0];
            const token = jwt.sign(rest, process.env.SECRET_KEY as string, { expiresIn: '2h' });

            return { message: 'Logged in successfully', token };
        } else {
            return { error: 'Incorrect password' };
        }
    }

    async resetPassword(userId: string, newPassword: string) {
        const pool = await mssql.connect(sqlConfig);
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        const result = await pool.request()
            .input('id', userId)
            .input('password', hashedPassword)
            .execute('ResetPassword');

        if (result.rowsAffected[0] === 1) {
            return { message: 'Password reset successfully' };
        } else {
            return { error: 'Unable to reset password' };
        }
    }
}
