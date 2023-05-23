import { Response } from "express";
import { generateToken } from ".";

export function sendCookie(res: Response, payload: any) {
  const token = generateToken(payload);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    // maxAge is good practice
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
}
