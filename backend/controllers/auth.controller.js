import { encodedToken } from "../helpers/generateToken.js";
import User from "../models/user.model.js";


// register
export const register = async (req, res) => {
  const { username, email, mssv, password, role } = req.body;

  try {
    const foundUser = await User.findOne({ $or: [{ username }, { email }, { mssv }] });

    if (foundUser) return res.status(403).json({ error: { message: "User has been existed!" } });

    let user = await User.create({
      username,
      email,
      mssv,
      password,
      role
    });
    user = user.toJSON();

    const token = encodedToken(user._id, user.role);
    res.setHeader("Authorization", token);

    return res.status(201).json({token, user});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error});
  }

};

// sign in
export const login = async (req, res) => {
  try {
    const token = encodedToken(req.user._id, req.user.role);

    res.setHeader("Authorization", token);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// sign in with google
export const authGoogle = async (req, res, next) => {
  try {
    const token = encodedToken(req.user._id, req.user.role);

    res.setHeader("Authorization", token);

    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export const secret = async (req, res, next) => {
  return res.status(200).json({ resources: true });
};

