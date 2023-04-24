import express from "express";
import { test } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.post("auth/signup", test);
userRouter.post("auth/login", test);
