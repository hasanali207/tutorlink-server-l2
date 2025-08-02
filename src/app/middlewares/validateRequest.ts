import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { catchAsync } from '../utilis/catchAsync';

export const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body , "body");
    await schema.parseAsync({
      body: req.body,
      query: req.query,
    });
    next();
  });
};
