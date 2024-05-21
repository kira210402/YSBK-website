import { ACTIVITY_MESSAGE, DEFAULT_IMAGE } from "../constants/index.js";
import Activity from "../models/activity.model.js";
import multer from "multer";
import { storage, cloudinary } from "../configs/cloudinary.config.js";
import { getIo } from "../configs/socket.config.js";
const upload = multer({ storage });
const ACTIVITY_IMAGE_DEFAULT = DEFAULT_IMAGE.DEFAULT_EVENT_IMAGE;

const getAll = async (req, res, next) => {
  try {
     const page = parseInt(req.query.page) || 1; // default page = 1
     const limit = parseInt(req.query.limit) || 10; // default limit = 20
     
     const skip = (page - 1) * limit;

    const activities = await Activity.find().skip(skip).limit(limit);

    const totalActivities = await Activity.countDocuments();

    return res.status(200).json({
      page,
      limit,
      totalActivities,
      totalPages: Math.ceil(totalActivities / limit),
      activities
    });
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
  const { title, description, content, status, startDate, endDate } = req.body;
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
      title,
      description,
      content,
      status,
      startDate,
      endDate,
      image: imageUrl,
    });

    getIo().enit("newActivity", activity);

    return res.status(201).json(activity);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, content, status, startDate, endDate } = req.body;
  try {
    const activity = await Activity.findById(id);
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

    activity.title = title || activity.title;
    activity.description = description || activity.description;
    activity.content = content || activity.content;
    activity.status = status || activity.status;
    activity.startDate = startDate || activity.startDate;
    activity.endDate = endDate || activity.endDate;
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
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = parseInt(req.query.limit) || 10; // default limit = 20
    
    const skip = (page - 1) * limit;

    const activities = await Activity.find({ status }).skip(skip).limit(limit);

    const totalActivities = await Activity.find({status}).countDocuments();

    return res.status(200).json({
      page,
      limit,
      totalActivities,
      totalPages: Math.ceil(totalActivities / limit),
      activities
    });
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

