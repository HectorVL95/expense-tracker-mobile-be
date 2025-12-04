"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./utils/db");
const user_route_1 = __importDefault(require("./api/user/user-route"));
const error_1 = require("./middlewares/error");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: process.env.CORS }));
app.use((0, helmet_1.default)());
(0, db_1.connect_to_db)();
app.use('/api/user', user_route_1.default);
// ERROR HANDLER MUST BE LAST
app.use(error_1.error_handler);
app.listen(process.env.PORT, () => {
    console.log(`connected to port: ${process.env.PORT}`);
});
