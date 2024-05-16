import mongoose from "mongoose";

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
    required: true,
  },

  status: {
    type: String,
    enum: ["EXPIRED", "ONGOING", "COMMING SOON"], 
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