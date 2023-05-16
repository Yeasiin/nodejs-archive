import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import UserModel from "../models/userModel";
import userModel from "../models/userModel";

const signUpScheme = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().min(5, "email is too short"),
  password: z.string().min(6, "password is too short"),
});

export async function signUp(req: Request, res: Response) {
  const { firstName, lastName, email, password } = signUpScheme.parse(req.body);

  /*   const { firstName, lastName, email, password } = {
    firstName: "yeasin",
    lastName: "arfat",
    email: "mail2@mail.com",
    password: "112233",
  };
 */
  const hashedPass = bcrypt.hash(password);

  const result = await UserModel.create({
    firstName,
    lastName,
    email,
    hashedPass,
  });

  const token = getToken({ email, name: `${firstName} ${lastName}` });
  res.json({ status: "success", data: result, token });
}
export function login(req: Request, res: Response) {}

function getToken(payload: { email: string; name: string }) {
  return JWT.sign(payload, process.env.JWT_SECRET);
}
