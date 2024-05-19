import { DEFAULT_IMAGE, USER_MESSAGE } from "../constants/index.js";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import Review from "../models/review.model.js";
import Comment from "../models/comment.model.js";
import multer from "multer";
import { storage, cloudinary } from "../configs/cloudinary.config.js";
const upload = multer({ storage });
const AVATAR_DEFAULT = DEFAULT_IMAGE.DEFAULT_AVATAR;

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
  upload.single("image");
  const { username, email, mssv, password, authType, role } = req.body;
  try {
    const foundUser = await User.findOne({ mssv });

    if (foundUser) return res.status(400).json({ message: "User had already existed!" });

    let imageUrl;

    if (req.file) {
      imageUrl = req.file.path;
    } else {
      const result = await cloudinary.uploader.upload(AVATAR_DEFAULT, {
        folder: "ysbk_images"
      });

      imageUrl = result.secure_url;
    }

    const user = await User.create({
      username,
      email,
      mssv,
      password,
      authType: authType ? authType : "local",
      role: role ? role : "User",
      avatar: imageUrl,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res, next) => {
  upload.single("image");
  const { id } = req.params;
  const { username, email, mssv, password, authType, role } = req.body;
  try {
    if (id === req.payload.sub || req.payload.role === "Admin") {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });

      if (!user) return res.status(404).json({ message: USER_MESSAGE.NOT_FOUND });

      let imageUrl = user.avatar;

      if (req.file) {
        imageUrl = req.file.path;
      } else if (!user.avatar) {
        const result = await cloudinary.uploader.upload(AVATAR_DEFAULT, {
          folder: "ysbk_images",
        });

        imageUrl = result.secure_url;
      };

      user.username = username || user.username;
      user.email = email || user.email;
      user.mssv = mssv || user.mssv;
      user.password = password || user.password;
      user.authType = authType || user.authType;
      user.role = role || user.role;
      user.avatar = imageUrl;
      await user.save();

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

// // // /users/add-book/:bookId
// const addBook = async (req, res, next) => {
//   const { bookId } = req.params;
//   try {
//     // Kiểm tra xem bookId có tồn tại không
//     const book = await Book.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     // Cập nhật user để thêm bookId vào mảng books
//     const user = await User.findByIdAndUpdate(
//       req.payload.sub,
//       { $addToSet: { books: bookId } }, // Sử dụng $addToSet để tránh thêm trùng lặp
//       { new: true } // Trả về user đã được cập nhật
//     ).populate('books');

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// }

// /users/add-review/:bookId
const addReview = async (req, res, next) => {
  const { bookId } = req.params;
  const { content, rating } = req.body;

  try {
    // Kiểm tra xem bookId có tồn tại không

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    };

    const foundReview = await Review.findOne({ bookId, userId: req.payload.sub });
    if (foundReview) return res.status(400).json({ message: "You already reviewed this book!" });

    // Tạo review mới
    const newReview = new Review({
      userId: req.payload.sub,
      bookId,
      content,
    });

    await newReview.save();

    // Cập nhật book để thêm review vào mảng reviews
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $push: { reviews: newReview._id, rating } }, // Thêm review vào mảng reviews
      { new: true } // Trả về book đã được cập nhật
    ).populate('reviews');

    await User.findByIdAndUpdate(
      req.payload.sub,
      { $push: { books: bookId } },
      { new: true }
    ).populate("books");

    const ratings = updatedBook.rating;
    const finalRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

    return res.status(201).json(newReview, finalRating);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const addComment = async (req, res, next) => {
  const { reviewId } = req.params;
  const { content } = req.body;
  try {
    const newComment = await Comment.create({
      userId: req.payload.sub,
      reviewId,
      content
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

// const ratingBook = async (req, res, next) => {
//   const { bookId } = req.params;
//   const { rating } = req.body;
//   try {
//     const foundBook = await Book.findByIdAndUpdate(bookId, { $push: { rating } });

//     if (!foundBook) return res.status(404).json({ message: "Book not found!" })

//     const finalRating = foundBook.rating;
//     console.log(finalRating);
//     return res.status(200).json();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   };
// };

export {
  getAll,
  getOne,
  create,
  update,
  deleteUser,
  addReview,
  addComment,
}

