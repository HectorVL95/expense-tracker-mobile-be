import { Request, Response } from 'express'
import expense_model from './expense-model';
import user_model from '../user/user-model';
import { async_handler } from '../../utils/async_handler';
import { error_response } from '../../utils/error-response';

export const create_expense = async_handler((req: Request, res: Response) => {
  const { name, price, photo } = req.body
})

export const edit_expense = async_handler((req: Request, res: Response) => {
  
})

export const delete_expense = async_handler((req: Request, res: Response) => {
  
})