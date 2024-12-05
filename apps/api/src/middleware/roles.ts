import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const isOrganizer = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'organizer') {
    return res.status(403).json({
      success: false,
      message: 'Organizer access required'
    });
  }

  next();
};