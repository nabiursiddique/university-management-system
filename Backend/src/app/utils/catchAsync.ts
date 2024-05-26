import { NextFunction, Request, RequestHandler, Response } from 'express';

//* Build this higher order function so that we don't have to write try-catch block again & again
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
