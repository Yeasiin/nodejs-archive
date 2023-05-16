import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./routes/userRouter";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";

const app = express();

// app required
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.use("/api/v1/", userRouter);

// handle no router found
app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on server`, 400));
});

// handle error
app.use(globalErrorHandler);

export default app;
