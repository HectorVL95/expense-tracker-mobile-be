"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_response = void 0;
class error_response extends Error {
    constructor(message, status_code) {
        super(message);
        this.status_code = status_code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.error_response = error_response;
