import { create_expense, edit_expense, delete_expense } from './expense-controller';
import { authenticate_token } from '../../middlewares/authenticate-token';
import Router from 'express';
import { upload } from '../../utils/multer'

const expense_route = Router()

expense_route.post('/create_expense', upload.single('photo'), authenticate_token,create_expense)

expense_route.patch('/edit_expense/:id', authenticate_token, edit_expense)

expense_route.delete('/delete_expense/:id', authenticate_token, delete_expense)

export default expense_route;