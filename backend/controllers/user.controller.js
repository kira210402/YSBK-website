import { USER_MESSAGE } from "../constants/index.js";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";

const getAll = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: USER_MESSAGE.NOT_FOUND });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id === req.payload.sub || req.payload.role === "Admin") {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });

      if (!user) return res.status(404).json({ message: USER_MESSAGE.NOT_FOUND });

      return res.status(200).json(user);
    } else return res.status(403).json({ message: "You are not allowed to update this user!" })
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: USER_MESSAGE.NOT_FOUND });

    return res.status(200).json({ message: USER_MESSAGE.DELETE_SUCCESS })
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// // /users/add-book/:userId/:bookId
const addBook = async (req, res, next) => {
  const { userId, bookId } = req.params;
  try {
    if (userId === req.payload.sub) {
      // Kiểm tra xem bookId có tồn tại không
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      // Cập nhật user để thêm bookId vào mảng books
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { books: bookId } }, // Sử dụng $addToSet để tránh thêm trùng lặp
        { new: true } // Trả về user đã được cập nhật
      ).populate('books');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } else return res.status(403).json({ message: "You are not allowed to add book for others!" })
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// /users/add-review/:userId/:bookId
const addReview = async (req, res, next) => {
  const { userId, bookId } = req.params;
  const { content, voteScore } = req.body;

  try {
    if (userId === req.payload.sub) {
    // Kiểm tra xem userId và bookId có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Tạo review mới
    const newReview = new Review({
      userId,
      bookId,
      content,
      voteScore
    });

    await newReview.save();

    // Cập nhật book để thêm review vào mảng reviews
    await Book.findByIdAndUpdate(
      bookId,
      { $push: { reviews: newReview._id } }, // Thêm review vào mảng reviews
      { new: true } // Trả về book đã được cập nhật
    ).populate('reviews');

    return res.status(201).json(newReview);
  } else return res.status(403).json({message: "You are not allowed to add review for others"})
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const addComment = async (req, res, next) => {
  const { userId, reviewId } = req.params;
  const { content } = req.body;
  try {
    if (userId === req.payload.sub) {
    const newComment = await Comment.create({
      userId,
      reviewId,
      content
    });
    newComment = newComment.toJSON();

    return res.status(201).json(newComment);
  } else return res.status(403).json({message: "You are not allowed to add comment for others"})
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export {
  getAll,
  getOne,
  create,
  update,
  deleteUser,
  addBook,
  addReview,
  addComment,
}

