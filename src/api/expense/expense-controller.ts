import { Request, Response } from 'express'
import expense_model from './expense-model';
import user_model from '../user/user-model';
import { async_handler } from '../../utils/async_handler';
import { error_response } from '../../utils/error-response';
import { upload_to_cloudinary } from '../../utils/upload-to-cloudinary';

export const create_expense = async_handler(async(req: Request, res: Response) => {
  const { name, price } = req.body

  const photo = req.file as Express.Multer.File

  const expense = await expense_model.create({name, price})

  if (photo) {
    const image_url = await upload_to_cloudinary.single(photo, `expense/${expense._id}`)
  }

  
})

export const edit_expense = async_handler((req: Request, res: Response) => {
  
})

export const delete_expense = async_handler((req: Request, res: Response) => {
  
})