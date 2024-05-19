import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const MONGODB_URI = process.env.MONGODB_URI || "";
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
export const JWT_SECRET_KEY_EXPIRE_TIME = process.env.JWT_SECRET_KEY_EXPIRE_TIME || "";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
export const CLIENT_URL = process.env.CLIENT_URL || "";
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "";
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "";