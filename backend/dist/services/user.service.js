"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sql_config_1 = require("../config/sql.config");
const uuid_1 = require("uuid");
class UserService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let result = yield pool.request()
                .input('id', (0, uuid_1.v4)())
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
            }
            else {
                return { error: 'Unable to create user' };
            }
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            const result = yield pool.request()
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
            }
            else {
                return { error: 'Unable to update user' };
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let result = yield pool.request().execute('GetAllUsers');
            return result.recordset;
        });
    }
}
exports.UserService = UserService;
