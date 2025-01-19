import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../helpers/jwt_service';

export class AuthMiddleware {
  constructor(private readonly jwtService: JWTService) {}

  validateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(' ')[1] || '';

      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }

      const isValid = this.jwtService.verifyToken(token);
      if (!isValid) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Error validating token' });
    }
  };
}
