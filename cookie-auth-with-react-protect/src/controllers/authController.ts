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

  result.password = undefined as any;

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
export function logout(req: Request, res: Response, next: NextFunction) {
  res.cookie("jwt", null, {
    httpOnly: true,
    expires: new Date(),
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "logout successful" });
}

/**
 * @desc get user profile
 * @route get api/v1/auth/profile
 * @access private
 */
export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore
  const userId = req.user._id;
  const user = await User.findById(userId);

  res.status(200).json({
    status: "success",
    data: user,
  });
}

/**
 * @desc update user profile
 * @route put api/v1/auth/profile
 * @access private
 */
const userUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  // email must be lower case always
  email: z.string().email().toLowerCase().optional(),
  avatar: z.string().optional(),
  role: z.string().optional(),
});

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const parsed = userUpdateSchema.parse(req.body);

  const data = await User.findByIdAndUpdate(req.user._id, parsed, {
    // this will make sure to return the updated value instead of old value (which are changed by this request)
    returnOriginal: false,
  });

  res.status(StatusCodes.OK).json({ status: "success", data });
}
