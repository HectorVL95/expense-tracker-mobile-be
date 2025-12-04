"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user-controller");
const user_route = (0, express_1.Router)();
user_route.post('/create_user', user_controller_1.create_user);
exports.default = user_route;
