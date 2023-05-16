import { config } from "dotenv";
config();
import "express-async-errors";
import { DBConnect } from "./db";
import app from "./server";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

try {
  DBConnect(MONGO_URI);
  app.listen(PORT, () =>
    console.log(`App is listing On Port: http://localhost:${PORT}`)
  );
} catch (error) {
  console.log(error);
}
