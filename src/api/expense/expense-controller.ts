import { Request, Response } from 'express'
import expense_model from './expense-model';
import user_model from '../user/user-model';
import { async_handler } from '../../utils/async_handler';
import { error_response } from '../../utils/error-response';
import { upload_to_cloudinary } from '../../config/cloudinary';
import { authenticated_request } from '../../types/authenticated';
import { Types } from 'mongoose';

export const create_expense = async_handler(async(req: Request, res: Response) => {
  const { name, amount, date } = req.body
  const { userId } = (req as authenticated_request).user!

  const photo = req.file

  // if (photo) {
  //   const image_url = await upload_to_cloudinary(photo, `expense/${expense._id}`)
  //   expense.photo = image_url
  //   await expense.save()
  // }}

  const parsed_amount = Number(amount)
  if (isNaN(parsed_amount)) {
    throw new error_response('Enter a valida amount', 400)
  }

  const parsed_date = new Date(date)
  if (isNaN(parsed_date.getTime())) {
    throw new error_response('Invalid date', 400)
  }

  const expense = await expense_model.create({name, amount: parsed_amount, date: parsed_date, owner_id: userId})

  console.log('expense created')

  res.status(200).json({
    success: true,
    message: 'Expense created',
    data: expense
  })
})

export const edit_expense = async_handler(async(req: Request, res: Response) => {
  const { id } = req.params
  const { name, price, photo, location } = req.body
  const { userId } = (req as authenticated_request).user!

  const expense = await expense_model.findById(id)

  if (!expense) throw new error_response('Expense not found', 404)

  if (expense.owner_id?.toString() !==  userId) throw new error_response('Only the owner can edit the expense', 401)

  const edited_expense = await expense?.updateOne({ name, price, photo, location })
  
  res.status(200).json({
    success: true,
    message: 'Expense edited',
    data: edited_expense
  })
})

export const delete_expense = async_handler(async(req: Request, res: Response) => {
  const { id } = req.params
  const { userId } = (req as authenticated_request).user!

  const expense = await expense_model.findById(id)

  if (!expense) throw new error_response('Expense does not exist', 404)

  if (expense.owner_id?.toString() !== userId) throw new error_response('Only the owner can edit the expense', 401)

  await expense_model.findOneAndDelete({ _id: id });

  res.status(200).json({
    success: true,
    message: 'Expense deleted',
  })
})

export const get_expenses = async_handler(async(req: Request, res: Response) => {
  const { userId } = (req as authenticated_request).user!

  const expenses = await expense_model.find({owner_id: userId})

  if (!expenses) throw new error_response('User does not have expenses', 404)  

  res.status(200).json({
    success: true,
    message: 'Expenses found',
    data: expenses
  })
})