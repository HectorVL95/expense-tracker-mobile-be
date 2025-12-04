import { error_response } from '../utils/error-response';
import type { Request, Response, NextFunction } from 'express';

export const error_handler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err as any;

  console.log("🔥 Error:", error);

  if (error.name === 'CastError') {
    error = new error_response("Resource not found", 400);
  }

  if (error.code === 11000) {
    error = new error_response("Duplicate field value entered", 400);
  }

  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors)
      .map((val: any) => val.message)
      .join(", ");
    error = new error_response(message, 400);
  }

  res.status(error.status_code || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};
