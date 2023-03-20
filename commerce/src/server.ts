import express from "express";
import { userRouter } from "./routes/userRouter";

export const app = express();

// app required
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", userRouter);
