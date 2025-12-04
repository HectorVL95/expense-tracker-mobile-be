"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const expense_model = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
});
exports.default = (0, mongoose_1.model)('Expense', expense_model);
