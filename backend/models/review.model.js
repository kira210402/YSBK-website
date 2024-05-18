import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  voteScore: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;