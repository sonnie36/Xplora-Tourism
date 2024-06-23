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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const Auth_service_1 = require("../services/Auth.service");
const userService = new user_service_1.UserService();
const authService = new Auth_service_1.AuthService();
class UserController {
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, role, profilePhoto, firstName, lastName } = req.body;
                const response = yield userService.createUser({ username, email, password, role, profilePhoto, firstName, lastName });
                return res.json(response);
            }
            catch (error) {
                return res.json({ error });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { username, email, password, role, profilePhoto, firstName, lastName } = req.body;
                const response = yield userService.updateUser({ id, username, email, password, role, profilePhoto, firstName, lastName });
                return res.json(response);
            }
            catch (error) {
                return res.json({ error });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userService.getAllUsers();
                return res.json(response);
            }
            catch (error) {
                return res.json({ error });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield authService.login({ email, password });
                return res.json(response);
            }
            catch (error) {
                return res.json({ error });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { newPassword } = req.body;
                const response = yield authService.resetPassword(id, newPassword);
                return res.json(response);
            }
            catch (error) {
                return res.json({ error });
            }
        });
    }
}
exports.UserController = UserController;
