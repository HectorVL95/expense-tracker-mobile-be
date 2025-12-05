import { Router } from 'express';
import { create_user, login_user, delete_user, get_logged_user_info } from './user-controller'
import { authenticate_token } from '../../middlewares/authenticate-token';

const user_route = Router()

user_route.post('/create_user', create_user)

user_route.post('/login_user', login_user)

user_route.delete('/delete_user', authenticate_token, delete_user)

user_route.get('/get_logged_user_info', authenticate_token, get_logged_user_info)

export default user_route