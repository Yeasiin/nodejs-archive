import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import User from "../models/userModel";
import { AppError } from "../utils";
import { StatusCodes } from "http-status-codes";

export async function protect(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt;
  // Error: JsonWebTokenError  / will be thrown automatic if the token is not valid
  // on global error handler `JsonWebTokenError` error are handled
  const result = JWT.verify(token, process.env.JWT_SECRET) as { _id: string };
  const user = await User.findById(result._id);
  if (!user) throw new AppError("user doesn't exist", StatusCodes.NOT_FOUND);
  // @ts-ignore
  req.user = user;

  next();
}
