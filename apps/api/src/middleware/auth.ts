import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token dari header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // TODO: Verify token dan dapatkan user
    // Untuk sementara kita hardcode untuk testing
    req.user = {
      id: 'default-id',
      role: 'organizer'
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token'
    });
  }
};