import mongoose from "mongoose";

export async function DBConnect(mongoURI: string) {
  try {
    await mongoose.connect(mongoURI);
    console.log("Database Connected");
  } catch (error) {
    console.log("Error 💥", error);
    process.exit(1);
  }
}
