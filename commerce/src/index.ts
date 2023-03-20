import { config } from "dotenv";
config();
import "express-async-errors";
import { DBConnect } from "./db.js";
import { app } from "./server.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

try {
  //   DBConnect(MONGO_URI);
  app.listen(PORT, () => console.log(`App is listing On Port: ${PORT}`));
} catch (error) {
  console.log(error);
}
