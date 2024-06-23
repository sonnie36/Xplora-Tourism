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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const mssql_1 = __importDefault(require("mssql"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sql_config_1 = require("../config/sql.config");
class AuthService {
    login(logins) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            const user = (yield pool.request()
                .input('email', logins.email)
                .execute('GetUserByEmail')).recordset;
            if (user.length < 1) {
                return { error: 'User not found' };
            }
            const hashedPassword = user[0].password;
            const passwordMatches = bcryptjs_1.default.compareSync(logins.password, hashedPassword);
            if (passwordMatches) {
                const _a = user[0], { password } = _a, rest = __rest(_a, ["password"]);
                const token = jsonwebtoken_1.default.sign(rest, process.env.SECRET_KEY, { expiresIn: '2h' });
                return { message: 'Logged in successfully', token };
            }
            else {
                return { error: 'Incorrect password' };
            }
        });
    }
    resetPassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            const hashedPassword = bcryptjs_1.default.hashSync(newPassword, 10);
            const result = yield pool.request()
                .input('id', userId)
                .input('password', hashedPassword)
                .execute('ResetPassword');
            if (result.rowsAffected[0] === 1) {
                return { message: 'Password reset successfully' };
            }
            else {
                return { error: 'Unable to reset password' };
            }
        });
    }
}
exports.AuthService = AuthService;
