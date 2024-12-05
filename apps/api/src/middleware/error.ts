import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // Prisma error handling
  if (err.code === 'P2002') {
    return res.status(400).json({
      success: false,
      message: 'Unique constraint failed',
      error: err.message
    });
  }

  // Default error response
  return res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: err
  });
};