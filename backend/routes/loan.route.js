import express from "express";
import { borrowBook, returnBook } from "../controllers/loan.controller.js";
const router = express.Router();

router.post("/borrow", borrowBook);
router.post("/return", returnBook);

router.post('/update/:mssv', async (req, res) => {
  // const { username, email, mssv, password, phoneNumber } = req.body;
  const { mssv } = req.params;

  try {
    let user = await User.findOne({ mssv });
    // if (user) {
    //   return res.status(400).json({ message: 'User with this MSSV already exists' });
    // }

    // const newUser = new User({
    //   username,
    //   email,
    //   mssv,
    //   password,
    //   phoneNumber,
    //   score: 0
    // });

    // await newUser.save();

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
});
export default router;