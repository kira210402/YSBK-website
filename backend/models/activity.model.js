import mongoose from "mongoose";
import { DEFAULT_IMAGE } from "../constants/index.js";

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: DEFAULT_IMAGE.DEFAULT_EVENT_IMAGE
  },

  status: {
    type: String,
    enum: ["PASSED", "ONGOING", "COMING SOON"], 
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;