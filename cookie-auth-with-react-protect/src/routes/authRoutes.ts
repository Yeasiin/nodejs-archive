import express from "express";
export const authRoute = express.Router();

import * as auth from "./../controllers/authController";
import { catchAsync } from "../utils";

authRoute.post("/auth/register", auth.register);
authRoute.post("/auth/login", auth.login);
authRoute.get("/auth/logout", auth.logout);
authRoute.get("/auth/profile", auth.profile);
