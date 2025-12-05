import user_model from './user-model'
import type { Request, Response } from 'express'
import { error_response } from '../../utils/error-response'
import { async_handler } from '../../utils/async_handler'
import { authenticated_request, authenticated_user } from '../../types/authenticated'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const create_user = async_handler(async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body

  const ecnrypted_password = await bcrypt.hash(password, 10)

  const user = await user_model.create({first_name, last_name, email, password: ecnrypted_password})

  if (!user)throw new error_response('Unable to create user', 401)
    console.log("BODY RECEIVED:", req.body);

  res.status(200).json({
    success: true,
    message: 'Successfully created user',
    data: user
  })
})

export const login_user = async_handler(async(req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await user_model.findOne({email})

  if (!user) throw new error_response('User not found', 404)

  const compared_password = bcrypt.compare(password, user.password)

  if (!compared_password) throw new error_response('Passwords do not match', 403)

  const token = jwt.sign({userId: user._id, email:email }, process.env.JWT_SECRET!, {expiresIn: '9999999h', algorithm: 'HS256'})
  
  res.status(200).json({
    success: true,
    message: `User succesfully ${user.first_name} logged`,
    token
  })
})

export const delete_user = async_handler(async(req: Request, res: Response) => {
  const { userId } = (req as authenticated_request).user!

  const user = await user_model.findByIdAndDelete(userId)

  if (!user) throw new error_response('User does not exist', 404)

  res.status(200).json({
    success: true,
    message: `User deleted successfully ${user.first_name} ${user.last_name}`
  })
})

export const get_logged_user_info = async_handler(async(req: Request, res: Response) => {
  const { userId } = (req as authenticated_request).user!

  const user = await user_model.findById(userId)

  if (!user) throw new error_response('User not found', 404)

  res.status(200).json({
    success: true,
    message: 'user logged successfully',
    data: user
  })
})