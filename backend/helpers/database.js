import mongoose from "mongoose";
import { MONGODB_URI } from "./config-env.js";

export const connectDB = () => {
  try {
    mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
}