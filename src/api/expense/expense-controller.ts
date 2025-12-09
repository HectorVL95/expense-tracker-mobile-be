import { Request, Response } from 'express'
import expense_model from './expense-model';
import user_model from '../user/user-model';
import { async_handler } from '../../utils/async_handler';
import { error_response } from '../../utils/error-response';
import { upload_to_cloudinary } from '../../config/cloudinary';
import { authenticated_request } from '../../types/authenticated';
import { Types } from 'mongoose';

export const create_expense = async_handler(async(req: Request, res: Response) => {
  const { name, price } = req.body
  const { userId } = (req as authenticated_request).user!

  const photo = req.file as Express.Multer.File

  const expense = await expense_model.create({name, price})

  if (photo) {
    const image_url = await upload_to_cloudinary(photo, `expense/${expense._id}`)
    expense.photo = image_url
    await expense.save()
  }

  expense.owner_id = new Types.ObjectId(userId)
  await expense.save()

  res.status(200).json({
    success: true,
    message: 'Expense created',
    data: expense
  })
})

export const edit_expense = async_handler(async(req: Request, res: Response) => {
  const { id } = req.params
  const { name, price, photo, location } = req.body

  const expense = await expense_model.findById(id)

  if (!expense) throw new error_response('Expense not found', 404)

  const edited_expense = await expense?.updateOne({ name, price, photo, location })
  
  res.status(200).json({
    success: true,
    message: 'Expense edited',
    data: edited_expense
  })
})

export const delete_expense = async_handler(async(req: Request, res: Response) => {
  const { id } = req.params
  
  const deleted_expense = await expense_model.findByIdAndDelete(id)

  if (!deleted_expense) throw new error_response('Expense does not exist', 404)

  res.status(200).json({
    success: true,
    message: 'Expense deleted',
  })
})