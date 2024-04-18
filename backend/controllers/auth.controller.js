import { JWT_SECRET_KEY, JWT_SECRET_KEY_EXPIRE_TIME } from "../helpers/config-env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const encodedToken = (userId) => {
  return jwt.sign(
    {
      iss: "Duong Kim Nam",
      sub: userId,
      iat: new Date().getTime()
    },
    JWT_SECRET_KEY,
    {
      expiresIn: JWT_SECRET_KEY_EXPIRE_TIME
    }
  )
}

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {

    const foundUser = await User.findOne({ $or: [{ username }, { email }] });

    if (foundUser) return res.status(403).json({ error: { message: "User has been existed!" } });

    const newUser = new User({
      username,
      email,
      password
    });

    const user = await newUser.save();

    const token = encodedToken(user._id);
    res.setHeader("Authorization", token);

    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(500).json(error);
  }

};

export const signIn = async (req, res) => {

}; 
