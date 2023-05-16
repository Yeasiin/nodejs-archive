import express from "express";
import * as userController from "../controllers/userController";

export const userRouter = express.Router();

userRouter.post("auth/signup", userController.signUp);
userRouter.post("auth/login", userController.login);
