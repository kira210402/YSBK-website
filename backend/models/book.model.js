import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  authorDescription: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  publishDate: {
    type: Date,
    required: true,
  },

  publishingCompany: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  code: {
    type: String,
    required: true,
  },

  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },

  genre: {
    type: String,
    enum: ["VN", "NN", "SK"],
    required: true,
  },

  status: {
    type: String,
    enum: ["AVAILABLE", "BORROWED"],
    default: "AVAILABLE"
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;