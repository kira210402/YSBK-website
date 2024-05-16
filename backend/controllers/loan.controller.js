import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import Loan from "../models/loan.model.js";

const borrowBook = async(req, res, next) => {
  const { mssv, fullName, phoneNumber, bookCode, deposit } = req.body;

  try {
    // Tìm book
    const book = await Book.findOne({ bookCode });
    if (!book || book.status !== "AVAILABLE") {
      return res.status(404).json({ message: 'Book not found or not available' });
    }

    // Tìm user theo mssv
    let user = await User.findOne({ mssv });

    // Tạo bản ghi loan
    const loan = new Loan({
      fullName: user ? user.username : fullName,
      mssv,
      phoneNumber,
      bookTitle: book.title,
      bookCode: book.bookCode,
      deposit,
      status: "BORROWED"
    });

    await loan.save();

    // Cập nhật trạng thái sách
    book.status = "BORROWED";
    await book.save();

    // Nếu user tồn tại, cập nhật danh sách sách của user
    if (user) {
      user.books.push(book._id);
      await user.save();
    }

    res.status(201).json(loan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const returnBook = async(req, res, next) => {
  const { bookCode } = req.body;

  try {
    // Tìm loan và book
    const loan = await Loan.findOne({ bookCode, status: "BORROWED" });
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    const book = await Book.findOne({ bookCode });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Cập nhật trạng thái loan và book
    loan.status = "RETURNED";
    await loan.save();

    book.status = "AVAILABLE";
    await book.save();

    // Xóa sách khỏi danh sách của user nếu tồn tại
    await User.updateOne({ mssv: loan.mssv }, { $pull: { books: book._id } });

    res.status(200).json(loan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  borrowBook,
  returnBook,
}