import mongoose from "mongoose";
import { config } from "dotenv";
config();
import app from "./server.js";

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log("Failed to connect to the database"));

const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
  console.log("APP is Running On PORT", PORT)
);
