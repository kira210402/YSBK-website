import { BOOK_MESSAGE, DEFAULT_IMAGE } from "../constants/index.js";
import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import multer from "multer";
import { storage, cloudinary } from "../configs/cloudinary.config.js";
const upload = multer({ storage });
const BOOK_IMAGE_DEFAULT = DEFAULT_IMAGE.DEFAULT_BOOK_IMAGE;

const getAll = async (req, res, next) => {
  try {
    const books = await Book.find().populate("reviews");

    const booksWithAvgRating = books.map(book => {
      const ratings = book.rating;
      const avgRating = ratings.reduce((acc, rate) => acc + rate, 0) / ratings.length || 0;
      return {
        ...book.toObject(),
        avgRating: avgRating.toFixed(2)
      }
    });

    booksWithAvgRating.sort((a, b) => b.avgRating - a.avgRating);

    return res.status(200).json(booksWithAvgRating);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).populate("reviews");

    if (!book) return res.status(404).json({ message: BOOK_MESSAGE.NOT_FOUND });

    const ratings = book.rating;
    const avgRating = ratings.reduce((acc, rate) => acc + rate, 0) / ratings.length || 0;

    const bookWithAvgRating = {
      ...book.toObject(),
      avgRating: avgRating.toFixed(2)
    }

    return res.status(200).json(bookWithAvgRating);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// search book by title, bookCode
const getBookByTitle = async (req, res, next) => {
  const { title } = req.params;
  try {
    const book = await Book.findOne({ title });

    if (!book) return res.status(404).json({ message: BOOK_MESSAGE.NOT_FOUND });

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getBookByBookCode = async (req, res, next) => {
  const { bookCode } = req.params;
  try {
    const book = await Book.findOne({ bookCode });

    if (!book) return res.status(404).json({ message: BOOK_MESSAGE.NOT_FOUND });

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error });
  }
};


// filter book by genre, status
const getBooksByGenre = async (req, res, next) => {
  const { genre } = req.params;
  try {
    const books = await Book.find({ genre });

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

const getBooksByStatus = async (req, res, next) => {
  const { status } = req.params;
  try {
    const books = await Book.find({ status });

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error });
  }
}


const create = async (req, res, next) => {
  upload.single('image');
  const { bookCode, genre, title, author, description } = req.body;
  try {
    const foundBook = await Book.findOne({ bookCode });

    if (foundBook) return res.status(400).json({ message: "Book have already existed!" });

    if (!bookCode.startsWith(genre)) return res.status(400).json({ message: "wrong genre!" });

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      const result = await cloudinary.uploader.upload(BOOK_IMAGE_DEFAULT, {
        folder: 'ysbk_images',
      });
      imageUrl = result.secure_url;
    };


    const book = await Book.create({
      title,
      author,
      description,
      bookCode,
      genre,
      image: imageUrl,
    });

    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const update = async (req, res, next) => {
  upload.single("image");
  const { id } = req.params;
  const {title, description, author, bookCode, genre} = req.body;
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: BOOK_MESSAGE.NOT_FOUND });

    let imageUrl = book.image;

    if (req.file) {
      imageUrl = req.file.path;
    } else if (!book.image) {
      const result = await cloudinary.uploader.upload(BOOK_IMAGE_DEFAULT, {
        folder: "ysbk_images",
      });

      imageUrl = result.secure_url;
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.bookCode = bookCode || book.bookCode;
    book.genre = genre || book.genre;
    book.image = imageUrl;
    
    await book.save();

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);

    if (!book) return res.status(404).json({ message: BOOK_MESSAGE.NOT_FOUND });

    return res.status(200).json({ message: BOOK_MESSAGE.DELETE_SUCCESS });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getMyBooks = async (req, res, next) => {
  try {
    const user = await User.findById(req.payload.sub).populate("books");

    if (!user) return res.status(404).json({ message: "User not found!" });

    return res.status(200).json(user.books);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

export {
  getAll,
  getOne,
  getBookByTitle,
  getBookByBookCode,
  getBooksByGenre,
  getBooksByStatus,
  getMyBooks,
  create,
  update,
  deleteBook,
}

