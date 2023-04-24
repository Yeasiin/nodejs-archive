import mongoose from "mongoose";

export async function DBConnect(URI: string) {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.log("failed to connect to db:💣", err);
  }
}
