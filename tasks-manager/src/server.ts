import express from "express";
import taskRouter from "./routes/tasks.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tasks", taskRouter);

export default app;
