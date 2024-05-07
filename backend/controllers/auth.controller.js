import { JWT_SECRET_KEY, JWT_SECRET_KEY_EXPIRE_TIME } from "../helpers/config-env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// generate token
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

// register
export const register = async (req, res) => {
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

// sign in
export const login = async (req, res) => {
  const token = encodedToken(req.user._id);

  res.setHeader("Authorization", token);

  return res.status(200).json({ success: true });
};

// sign in with google
export const authGoogle = async (req, res, next) => {
  const token = encodedToken(req.user._id);

  res.setHeader("Authorization", token);

  return res.status(200).json({ success: true });
}

export const secret = async (req, res, next) => {
  return res.status(200).json({ resources: true });
};

// sign in with facebook
export const authFacebook = async (req, res, next) => {
  console.log("user", req.user);
  // const token = encodedToken(req.user._id);

  // res.setHeader("Authorization", token);

  // return res.status(200).json({ success: true });
}
