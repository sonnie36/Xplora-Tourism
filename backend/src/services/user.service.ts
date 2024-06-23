import mssql from 'mssql';
import { sqlConfig } from '../config/sql.config';
import { User } from '../interfaces/user.interface';
import { v4 } from 'uuid';

export class UserService {
    async createUser(user: User) {
        let pool = await mssql.connect(sqlConfig);

        let result = await pool.request()
            .input('id', v4())
            .input('username', user.username)
            .input('email', user.email)
            .input('password', user.password)
            .input('role', user.role)
            .input('firstName', user.firstName)
            .input('lastName', user.lastName)
            .input('profilePhoto', user.profilePhoto || null)
            .execute('CreateUser');

        if (result.rowsAffected[0] === 1) {
            return { message: 'User created successfully' };
        } else {
            return { error: 'Unable to create user' };
        }
    }

    async updateUser(user: User) {
        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input('id', user.id)
            .input('username', user.username)
            .input('email', user.email)
            .input('password', user.password)
            .input('role', user.role)
            .input('firstName', user.firstName)
            .input('lastName', user.lastName)
            .input('profilePhoto', user.profilePhoto || null)
            .execute('UpdateUser');

        if (result.rowsAffected[0] === 1) {
            return { message: 'User updated successfully' };
        } else {
            return { error: 'Unable to update user' };
        }
    }

    async getAllUsers() {
        const pool = await mssql.connect(sqlConfig);

        let result = await pool.request().execute('GetAllUsers');
        return result.recordset;
    }
}
