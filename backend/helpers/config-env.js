import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const MONGODB_URI = process.env.MONGODB_URI || "";
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
export const JWT_SECRET_KEY_EXPIRE_TIME = process.env.JWT_SECRET_KEY_EXPIRE_TIME || "";