import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  console.log('req jwt', req);
  next();
}