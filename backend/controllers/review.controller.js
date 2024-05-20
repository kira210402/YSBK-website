import Book from "../models/book.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";

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

    await User.findByIdAndUpdate(
      updatedReview.userId,
      { $inc: { score: 1 } }
    );

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

    await User.findByIdAndUpdate(
      updatedReview.userId,
      { $inc: { score: -1 } }
    );

    return res.status(200).json(updatedReview);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { content, rating } = req.body;
  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId === req.payload.sub) {
      const updatedReview = await Review.findByIdAndUpdate(id, content, { new: true });

      const updatedBook = await Book.findByIdAndUpdate(updatedReview.bookId, { $push: { rating } }).populate("reviews");

      const ratings = updatedBook.rating;
      const avgRating = ratings.reduce((acc, rate) => acc + rate, 0) / ratings.length;
      const updatedBookWithAvgRating = {
        ...updatedBook.toObject(),
        avgRating: avgRating.toFixed(2)
      }

      return res.status(200).json({ updatedReview, updatedBookWithAvgRating });

    } else return res.status(403).json({ message: "You are not allowed to update this review!" })
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteReview = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundReview = await Review.findById(id);

    if (!foundReview) return res.status(404).json({ message: "Review not found!" });

    if (req.payload.role === "Admin" || foundReview.userId === req.payload.sub) {
      const deletedReview = await Review.findByIdAndDelete(id);

      return res.status(200).json({ message: "Delete successfully!", deletedReview });
    } else return res.status(403).json({ message: "Only admin or review's owner can delete this review" })
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

const getHighest = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = parseInt(req.query.limit) || 20; // default limit = 20

    const skip = (page - 1) * limit;

    const reviews = await Review.find({ bookId }).sort({ voteScore: -1 }).skip(skip).limit(limit);

    const totalReviews = await Review.find({ bookId }).countDocuments();

    return res.status(200).json({
      page,
      limit,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      reviews
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

const getLatest = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = parseInt(req.query.limit) || 20; // default limit = 20

    const skip = (page - 1) * limit;

    const reviews = await Review.find({ bookId }).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const totalReviews = await Review.find({ bookId }).countDocuments();

    return res.status(200).json({
      page,
      limit,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      reviews
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

const getOldest = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = parseInt(req.query.limit) || 20; // default limit = 20
    
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ bookId }).sort({ createdAt: 1 }).skip(skip).limit(limit);

    const totalReviews = await Review.find({bookId}).countDocuments();

    return res.status(200).json({
      page,
      limit,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      reviews
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

export {
  upvote,
  downvote,
  update,
  deleteReview,
  getHighest,
  getOldest,
  getLatest,
}

