import { UploadStream } from "cloudinary";
import { ACTIVITY_MESSAGE, DEFAULT_IMAGE } from "../constants/index.js";
import Activity from "../models/activity.model.js";
import multer from "multer";
import { storage, cloudinary } from "../configs/cloudinary.config.js";
const upload = multer({ storage });
const ACTIVITY_IMAGE_DEFAULT = DEFAULT_IMAGE.DEFAULT_EVENT_IMAGE;

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
  upload.single("image");
  try {
    let imageUrl;

    if (req.file) {
      imageUrl = req.file.path;
    } else {
      const result = await cloudinary.uploader.upload(ACTIVITY_IMAGE_DEFAULT, {
        folder: "ysbk_images",
      });
      imageUrl = result.secure_url;
    }

    const activity = await Activity.create({
      ...req.body,
      image: imageUrl,
    });

    return res.status(201).json(activity);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
    if (!activity) return res.status(404).json({ message: ACTIVITY_MESSAGE.NOT_FOUND });

    let imageUrl = activity.image;

    if (req.file) {
      imageUrl = req.file.path;
    } else if (!activity.image) {
      const result = await cloudinary.uploader.upload(ACTIVITY_IMAGE_DEFAULT, {
        folder: "ysbk_images"
      });
      imageUrl = result.secure_url;
    }

    activity.image = imageUrl;
    await activity.save();

    return res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteActivity = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundActivity = await Activity.findByIdAndDelete(id);

    if (!foundActivity) return res.status(404).json({ message: ACTIVITY_MESSAGE.NOT_FOUND });

    return res.status(200).json({ message: ACTIVITY_MESSAGE.DELETE_SUCCESS });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getActivitiesByStatus = async (req, res, next) => {
  const { status } = req.params;
  try {
    const activities = await Activity.find({ status });

    return res.status(200).json(activities);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export {
  getAll,
  getOne,
  getActivitiesByStatus,
  create,
  update,
  deleteActivity,
}

