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