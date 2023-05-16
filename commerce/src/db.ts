import mongoose from "mongoose";

export async function DBConnect(URI: string) {
  try {
    await mongoose.connect(URI);
    console.log("connected to Database");
  } catch (err) {
    console.log("failed to connect to db:💣", err);
  }
}
