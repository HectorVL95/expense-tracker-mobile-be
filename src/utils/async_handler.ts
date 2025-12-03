import type {Request, Response, NextFunction, RequestHandler} from 'express'

type async_request_handler =  (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

export const async_handler = (fn: async_request_handler): RequestHandler =>  {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}