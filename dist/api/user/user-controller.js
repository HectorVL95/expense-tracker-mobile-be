"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_user = exports.create_user = void 0;
const user_model_1 = __importDefault(require("./user-model"));
const error_response_1 = require("../../utils/error-response");
const async_handler_1 = require("../../utils/async_handler");
exports.create_user = (0, async_handler_1.async_handler)(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const user = await user_model_1.default.create({ first_name, last_name, email, password });
    if (!user)
        throw new error_response_1.error_response('Unable to create user', 401);
    console.log("BODY RECEIVED:", req.body);
    res.status(200).json({
        success: true,
        message: 'Successfully created user',
        data: user
    });
});
exports.delete_user = (0, async_handler_1.async_handler)(async (req, res) => {
});
