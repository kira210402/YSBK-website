import { BOOK_MESSAGE } from "../constants/index.js";
import Book from "../models/book.model.js";

const getAll = async (req, res, next) => {
  try {
    const books = await Book.find();

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);

    if (!book) return res.status(404).json({ message: BOOK_MESSAGE.NOT_FOUND });

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const create = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    book = book.toJSON();

    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(id, req.body);

    if (!book) return res.status(404).json({ message: BOOK_MESSAGE.NOT_FOUND });

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

export {
  getAll,
  getOne,
  create,
  update,
  deleteBook,
}

