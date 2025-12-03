import * as jwt from 'jsonwebtoken'
import type { Response, NextFunction } from 'express'
import { authenticated_request } from '../../types/authenticated';
import { authenticated_user } from '../../types/authenticated';

export const authenticate_token = async (req: authenticated_request, res: Response, next: NextFunction) => {
  const auth_headers = req.headers['authorization'];
  const token = auth_headers && auth_headers?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Token not found'
    })
    return;
  }

   const secret = process.env.JWT_SECRET as string;

  jwt.verify(token, secret, (err, decoded) => {
    if (err || !decoded) {
      res.status(403).json({
        message: 'token required'
      })
    }

    req.user = decoded as authenticated_user;

    return next()
  })
}