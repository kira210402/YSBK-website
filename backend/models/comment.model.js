import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  reviewId: {
    type: Schema.Types.ObjectId,
    ref: "Review",
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;