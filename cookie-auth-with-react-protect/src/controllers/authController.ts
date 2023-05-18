import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import User from "./../models/userModel";
import { AppError, sendCookie } from "../utils";

/**
 * @desc register new user
 * @route post api/v1/auth/register
 * @access public
 */
const registerSchema = z
  .object({
    name: z.string().min(3),
    // email must be lower case always
    email: z.string().email().toLowerCase(),
    password: z.string().min(6),
    confirm: z.string(),
  })
  .refine((obj) => obj.password === obj.confirm, {
    message: "Passwords do not match",
    path: ["confirm"], // this value is concatenated to the end of the actual path of the error
  });
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, password } = registerSchema.parse(req.body);

  // if user already exit
  const userExist = await User.findOne({ email });
  if (userExist)
    throw new AppError(
      "user already exist with the same email ",
      StatusCodes.BAD_REQUEST
    );

  const result = await User.create({ name, email, password });

  sendCookie(res, { _id: result._id });
  res.status(StatusCodes.CREATED).json({ status: "success", data: result });
}

/**
 * @desc login the previously registered user
 * @route post api/v1/auth/login
 * @access public
 */

const loginZodSchema = z.object({
  // email must be lower case always
  email: z.string().email().toLowerCase(),
  password: z.string().min(6, "password is too short"),
});

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = loginZodSchema.parse(req.body);

  // check if user exit
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.isPasswordMatch(password)))
    throw new AppError("invalid credential", 400);

  // remove password hash
  user.password = undefined as any;

  sendCookie(res, { _id: user._id });

  res.status(200).json({ status: "success", data: user });
}

/**
 * @desc logout the previously logged user
 * @route post api/v1/auth/logout
 * @access public
 */
export function logout(req: Request, res: Response, next: NextFunction) {}

/**
 * @desc get user profile
 * @route get api/v1/auth/profile
 * @access private
 */
export async function profile(req: Request, res: Response, next: NextFunction) {
  const results = await User.find({});

  res.status(200).json({
    status: "success",
    data: results,
  });
}
