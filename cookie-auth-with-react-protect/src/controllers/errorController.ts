import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { AppError } from "../utils";

function handleZodValidationError(err: any, req: Request, res: Response) {
  const zodError = err.flatten().fieldErrors;

  res.status(StatusCodes.BAD_REQUEST).json({
    status: "failed",
    message: zodError,
  });
}

function handleDuplicateFieldsDB(err: any) {
  const message = `Duplicate field value: ${Object.values(err.keyValue).join(
    ". "
  )}`;
  return new AppError(message, 400);
}

function handleJWTError() {
  return new AppError(
    "Invalid token, Please login again",
    StatusCodes.UNAUTHORIZED
  );
}

function sendErrorOnDevelopment(err: AppError, req: Request, res: Response) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
}

function sendErrorOnProduction(err: AppError, req: Request, res: Response) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // unknown error
    console.log("unknown error❌❌", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "something went wrong",
    });
  }
}

export default function globalErrorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.status = err.status || "failed";

  if (process.env.NODE_ENV === "development") {
    if (err.name === "ZodError") handleZodValidationError(err, req, res);

    sendErrorOnDevelopment(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    // message property lost during destruction.
    // so reassigning again
    error.message = err.message;

    if (err.name === "ZodError") handleZodValidationError(err, req, res);
    // @ts-ignore
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();

    sendErrorOnProduction(error, req, res);
  } else {
    res.json({
      status: "failed",
      message: "NODE_ENV is not defined",
    });
  }
}

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
  next(
    new AppError(`route ${req.originalUrl} not found`, StatusCodes.NOT_FOUND)
  );
}
