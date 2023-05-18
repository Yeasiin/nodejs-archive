import { config } from "dotenv";
config();

import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";

import { authRoute } from "./routes/authRoutes";
import globalErrorHandler, {
  routeNotFound,
} from "./controllers/errorController";
import { DBConnect } from "./utils";

export const app = express();

DBConnect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/", authRoute);

// handle not found / no route error
app.use(routeNotFound);

// handle thrown error
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `server is running ${process.env.NODE_ENV} Mode on http://localhost:${PORT}`
  )
);
