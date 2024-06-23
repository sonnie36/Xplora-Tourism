"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const controller = new user_controller_1.UserController();
const user_router = (0, express_1.Router)();
user_router.post('/addUser', controller.addUser);
exports.default = user_router;
