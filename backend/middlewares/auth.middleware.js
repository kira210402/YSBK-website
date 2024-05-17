import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../helpers/config-env.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const accessToken = token && token.split(" ")[1];

    if (!accessToken) return res.status(404).json({ message: "Token not found" });

    const payload = await jwt.verify(
      accessToken,
      JWT_SECRET_KEY,
    );

    req.payload = payload;
    console.log(payload);
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const accessToken = token && token.split(" ")[1];

    if (!accessToken) return res.status(404).json({ message: "Token not found" });

    const verified = await jwt.verify(
      accessToken,
      JWT_SECRET_KEY
    );

    if (verified && verified.role === "Admin") {
      req.payload = verified;
      next();
    } else return res.status(403).json({ message: "Only admin allowed1" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const verifyModAndAdmin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const accessToken = token && token.split(" ")[1];

    if (!accessToken) return res.status(404).json({ message: "Token not found" });

    const verified = await jwt.verify(
      accessToken,
      JWT_SECRET_KEY
    );

    if (verified && ( verified.role === "Admin" || verified.role === "Moderator")) {
      req.payload = verified;
      next();
    } else return res.status(403).json({ message: "Only admin and moderator allowed1" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export {
  verifyToken,
  verifyAdmin,
  verifyModAndAdmin,
}