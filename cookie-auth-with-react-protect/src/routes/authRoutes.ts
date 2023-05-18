import express from "express";
export const authRoute = express.Router();

import * as auth from "./../controllers/authController";
import { protect } from "../middleware/authMiddleware";

authRoute.post("/auth/register", auth.register);
authRoute.post("/auth/login", auth.login);
authRoute.post("/auth/logout", auth.logout);

authRoute
  .route("/auth/profile")
  .get(protect, auth.getProfile)
  .put(protect, auth.updateProfile);
