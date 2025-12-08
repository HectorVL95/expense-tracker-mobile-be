import express from 'express';
import helmet from 'helmet';

import cors from 'cors';
import dotenv from 'dotenv';

import { connect_to_db } from './utils/db';
import user_route from './api/user/user-route';
import { error_handler } from './middlewares/error';
import expense_route from './api/expense/expense-route';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: process.env.CORS }));
app.use(helmet());


connect_to_db();

app.use('/api/user', user_route);
app.use('/api/expense', expense_route)

// ERROR HANDLER MUST BE LAST
app.use(error_handler);

app.listen(process.env.PORT, () => {
  console.log(`connected to port: ${process.env.PORT}`);
});