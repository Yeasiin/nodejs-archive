import express from "express";
import { userRouter } from "./routes/userRouter";

const app = express();

// app required
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.use("/api/v1/", userRouter);

export default app;
