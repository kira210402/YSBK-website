import mongoose, { Schema } from "mongoose";

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

  image: {
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

  bookCode: {
    type: String,
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
    required: true,
  },

  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }]
});

const Book = mongoose.model("Book", bookSchema);
export default Book;