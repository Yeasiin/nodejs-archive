import mongoose from "mongoose";

export async function DBConnect(URI: string) {
  await mongoose.connect(URI);
}
