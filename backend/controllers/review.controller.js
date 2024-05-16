import mongoose from "mongoose";
import Review from "../models/review.model.js";
import Comment from "../models/comment.model.js";

const upvote = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $inc: { voteScore: 1 } }, // Sử dụng $inc để tăng voteScore lên 1
      { new: true } // Trả về review đã được cập nhật
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.status(200).json(updatedReview);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const downvote = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $inc: { voteScore: -1 } }, // Sử dụng $inc để giảm voteScore xuống 1
      { new: true } // Trả về review đã được cập nhật
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.status(200).json(updatedReview);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const addComment = async (req, res, next) => {
  const { reviewId } = req.params;
  const { content } = req.body;
  try {
    const newComment = await Comment.create({
      reviewId,
      content
    });
    newComment = newComment.toJSON();

    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export {
  upvote,
  downvote,
  addComment,
}

