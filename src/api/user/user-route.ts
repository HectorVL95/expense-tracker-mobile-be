import { Router } from 'express';
import { create_user } from './user-controller.ts'

const user_route = Router()

user_route.post('/create_user')

export default user_route