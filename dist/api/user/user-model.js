"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_model = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Task'
        }],
    date_created: {
        type: Date,
        default: Date.now()
    }
});
exports.default = (0, mongoose_1.model)('User', user_model);
