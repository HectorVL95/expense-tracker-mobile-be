import user_model from './user-model.ts'
import mongoose from 'mongoose'
import type { Request, Response } from 'express'
import { error_response } from '../../utils/error-response.ts'
import { async_handler } from '../../utils/async_handler.ts'

export const create_user = async_handler(async (req: Request, res: Response) => {
  const {first_name, last_name, email, password} = req.body
  const user = await user_model.create({first_name, last_name, email, password})

  if (!user) new error_response('Unable to create user', 404)
  
  res.status(200).json({
    success: true,
    message: 'Successfully created user',
    data: user
  })
})

export const delete_user = async_handler(async(req: Request, res: Response) => {
  
})