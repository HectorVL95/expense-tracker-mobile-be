import user_model from './user-model'
import type { Request, Response } from 'express'
import { error_response } from '../../utils/error-response'
import { async_handler } from '../../utils/async_handler'
import { authenticated_request, authenticated_user } from '../../types/authenticated'

export const create_user = async_handler(async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body
  const user = await user_model.create({first_name, last_name, email, password})

  if (!user)throw new error_response('Unable to create user', 401)
    console.log("BODY RECEIVED:", req.body);

  
  res.status(200).json({
    success: true,
    message: 'Successfully created user',
    data: user
  })
})

export const delete_user = async_handler(async(req: Request, res: Response) => {
  const { userId} = (req as authenticated_request).user

  const user = await user_model.findByIdAndDelete(userId)

  if (!user) throw new error_response('User does not exist', 404)

  res.status(200).json({
    success: true,
    message: `User deleted successfully ${user.first_name} ${user.last_name}}`
  })
})

export const get_user_info = async_handler(async(req: Request, res: Response) => {
  const { userId } = (req as authenticated_request).user

  const user = await user_model.findById(userId)

  if (!user) throw new error_response('User not found', 404)

  res.status(200).json({
    success: false,
    message: 'Error in the response to find '
  })

})