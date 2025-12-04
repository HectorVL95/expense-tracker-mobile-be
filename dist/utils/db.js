"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect_to_db = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect_to_db = async () => {
    try {
        (0, mongoose_1.connect)(process.env.DB, {
            dbName: process.env.DB_NAME
        });
        console.log(`Connected to database ${process.env.DB_NAME}`);
    }
    catch (error) {
        console.error('Not connected to db', error);
    }
};
exports.connect_to_db = connect_to_db;
