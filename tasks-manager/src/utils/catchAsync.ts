import { Response, Request, NextFunction } from "express";

export default function catchAsync(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch(next);
  };
}
