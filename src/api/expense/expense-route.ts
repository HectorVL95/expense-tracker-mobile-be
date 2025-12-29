import { create_expense, edit_expense, delete_expense, get_expenses, get_single_expense } from './expense-controller';
import { authenticate_token } from '../../middlewares/authenticate-token';
import Router from 'express';
import { upload } from '../../utils/multer'

const expense_route = Router()

expense_route.post('/create_expense', authenticate_token, upload.single('photo'), create_expense)

expense_route.patch('/edit_expense/:id', authenticate_token, upload.single('photo'), edit_expense)

expense_route.delete('/delete_expense/:id', authenticate_token, delete_expense)

expense_route.get('/get_expenses', authenticate_token, get_expenses)

expense_route.get('/get_single_expense/:id', authenticate_token, get_single_expense)

export default expense_route;