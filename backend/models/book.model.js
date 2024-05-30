import mongoose, { Schema } from "mongoose";
import { DEFAULT_IMAGE } from "../constants/index.js";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: DEFAULT_IMAGE.DEFAULT_BOOK_IMAGE,
  },

  rating: [{
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
  }],

  bookCode: {
    type: String,
    unique: true,
    required: true,
  },

  genre: {
    type: String,
    enum: ["VN", "NN", "SK"],
    required: true,
  },

  status: {
    type: String,
    enum: ["AVAILABLE", "BORROWED"],
    default: "AVAILABLE",
  },

  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }]
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
export default Book;