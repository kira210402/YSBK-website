import { ACTIVITY_MESSAGE } from "../constants/index.js";
import Activity from "../models/activity.model.js";

const getAll = async (req, res, next) => {
  try {
    const activities = await Activity.find();

    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const activity = await Activity.findById(id);

    if (!activity) return res.status(404).json({ message: ACTIVITY_MESSAGE.NOT_FOUND });

    return res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const create = async (req, res, next) => {
  try {
    const activity = await Activity.create(req.body);
    activity = activity.toJSON();

    return res.status(201).json(activity);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findByIdAndUpdate(id, req.body);
    if(!activity) return res.status(404).json({message: ACTIVITY_MESSAGE.NOT_FOUND});

    return res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteActivity = async (req, res, next) => {
  const {id} = req.params;
  try {
    const foundActivity = await Activity.findByIdAndDelete(id);

    if(!foundActivity) return res.status(404).json({message: ACTIVITY_MESSAGE.NOT_FOUND});

    return res.status(200).json({message: ACTIVITY_MESSAGE.DELETE_SUCCESS});
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export {
  getAll,
  getOne,
  create,
  update,
  deleteActivity,
}

