import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import Loan from "../models/loan.model.js";

const getAllLoans = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = parseInt(req.query.limit) || 20; // default limit = 20

    const skip = (page - 1) * limit;

    const loans = await Loan.find().sort({ borrowDate: -1 }).skip(skip).limit(limit);

    const totalLoans = await Loan.countDocuments();

    const borrowedLoans = await Loan.aggregate([
      {
        $match:
          { status: "BORROWED" }
      },
      {
        $group: {
          _id: null,
          totalDeposit: { $sum: '$deposit' }
        }
      }
    ]);

    const returnedLoans = await Loan.aggregate([
      {
        $match: {
          status: " RETURNED"
        }
      },
      {
        $group: {
          _id: null,
          totalDeposit: { $sum: "$deposit" }
        }
      }
    ]);

    const totalBorrowedDeposit = borrowedLoans[0]?.totalDeposit || 0;
    const totalReturnedDeposit = returnedLoans[0]?.totalDeposit || 0;

    const finalDeposit = totalBorrowedDeposit - totalReturnedDeposit;

    return res.status(200).json({
      page,
      limit,
      totalLoans,
      totalPages: Math.ceiling(totalLoans / limit),
      loans,
      finalDeposit
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

const borrowBook = async (req, res, next) => {
  const { mssv, fullName, phoneNumber, bookCode, deposit, finalDeposit } = req.body;

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

    finalDeposit += loan.deposit;

    // Cập nhật trạng thái sách
    book.status = "BORROWED";
    await book.save();

    // Nếu user tồn tại, cập nhật danh sách sách của user
    if (user) {
      user.books.push(book._id);
      await user.save();
    }

    res.status(201).json({ loan, finalDeposit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const returnBook = async (req, res, next) => {
  const { bookCode, finalDeposit } = req.params;

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

    // comment 2 below code line because when a user return a book, books' user is still there!
    // Xóa sách khỏi danh sách của user nếu tồn tại
    // await User.updateOne({ mssv: loan.mssv }, { $pull: { books: book._id } });

    finalDeposit -= loan.deposit;

    res.status(200).json({ loan, finalDeposit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const filterByDate = async (req, res, next) => {
  const { date } = req.params;
  try {
    const borrowDate = new Date(date);

    const startOfDay = new Date(borrowDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(borrowDate.setUTCHours(23, 59, 59, 999));

    const loans = await Loan.find(
      {
        borrowDate: {
          $gte: startOfDay,
          $lte: endOfDay,
        }
      });

    return res.status(200).json(loans);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const filterByMssv = async (req, res, next) => {
  const { mssv } = req.params;
  try {
    const loans = await Loan.find({ mssv });

    return res.status(200).json(loans);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const filterByBookCode = async (req, res, next) => {
  const { bookcode } = req.params;
  try {
    const loans = await Loan.find({ bookCode: bookcode });

    return res.status(200).json(loans);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const filterByStatus = async (req, res, next) => {
  const { status } = req.params;
  try {
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = parseInt(req.query.limit) || 20; // default limit = 20

    const skip = (page - 1) * limit;

    const loans = await Loan.find({ status }).skip(skip).limit(limit);

    const totalLoans = await Loan.find({ status }).countDocuments();

    return res.status(200).json({
      page,
      limit,
      totalLoans,
      totalPages: Math.ceiling(totalLoans / limit),
      loans
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  };
};

const updateBooksLoanAfterRegister = async (req, res) => {
  const { mssv } = req.params;

  try {
    let user = await User.findOne({ mssv });

    // Cập nhật thông tin sách đã mượn
    const loans = await Loan.find({ mssv });
    const bookIds = await Book.find({ bookCode: { $in: loans.map(loan => loan.bookCode) } }).select('_id');
    user.books = bookIds.map(book => book._id);
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  getAllLoans,
  borrowBook,
  returnBook,
  filterByBookCode,
  filterByMssv,
  filterByDate,
  filterByStatus,
  updateBooksLoanAfterRegister,
}