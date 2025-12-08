import { create_expense } from './expense-controller';
import Router from 'express';
import { upload } from '../../utils/multer'

const expense_route = Router()

expense_route.post('/create_expense', upload.single('photo'),create_expense)

export default expense_route;