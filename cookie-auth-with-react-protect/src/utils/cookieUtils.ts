import { Response } from "express";
import { generateToken } from ".";

export function sendCookie(res: Response, payload: any) {
  const token = generateToken(payload);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
}
