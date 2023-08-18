import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';

export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  console.log('req validation', req);
  next();
}