"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_handler = void 0;
const error_response_1 = require("../utils/error-response");
const error_handler = (err, req, res, next) => {
    let error = err;
    console.log("🔥 Error:", error);
    if (error.name === 'CastError') {
        error = new error_response_1.error_response("Resource not found", 400);
    }
    if (error.code === 11000) {
        error = new error_response_1.error_response("Duplicate field value entered", 400);
    }
    if (error.name === 'ValidationError') {
        const message = Object.values(error.errors)
            .map((val) => val.message)
            .join(", ");
        error = new error_response_1.error_response(message, 400);
    }
    res.status(error.status_code || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};
exports.error_handler = error_handler;
