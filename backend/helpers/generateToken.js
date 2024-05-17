import { JWT_SECRET_KEY, JWT_SECRET_KEY_EXPIRE_TIME } from "../helpers/config-env.js";
import jwt from "jsonwebtoken";

// generate token
const encodedToken = (userId, userRole) => {
  return jwt.sign(
    {
      iss: "Duong Kim Nam",
      sub: userId,
      role: userRole,
      iat: new Date().getTime()
    },
    JWT_SECRET_KEY,
    {
      expiresIn: JWT_SECRET_KEY_EXPIRE_TIME
    }
  )
};

export {
  encodedToken,
}