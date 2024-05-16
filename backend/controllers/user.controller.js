import { USER_MESSAGE } from "../constants/index.js";
import User from "../models/user.model.js";

const getAll = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: USER_MESSAGE.NOT_FOUND })
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    user = user.toJSON();

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) return res.status(404).json({ message: USER_MESSAGE.NOT_FOUND });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: USER_MESSAGE.NOT_FOUND });

    return res.status(200).json({ message: USER_MESSAGE.DELETE_SUCCESS })
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export {
  getAll,
  getOne,
  create,
  update,
  deleteUser,
}

