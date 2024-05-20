import User from "../models/user.model.js";
import Book from "../models/book.model.js";

const getAbout = async (req, res) => {
  try {
    return res.status(200).json({
      clbName: "CLB Yêu sách Bách Khoa Hà Nội",
      email: "clbyeusachbachkhoahanoi@gmail.com",
      phoneNumber: "0376298583",
      facebook: "https://www.facebook.com/CLBYeuSachBachKhoaHaNoi",
    })
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getLeaderBoard = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = parseInt(req.query.limit) || 20; // default limit = 20
    
    const skip = (page - 1) * limit;

    const users = await User.aggregate([
      {
        $sort: { score: -1 } // Sắp xếp theo score từ lớn đến bé
      }
    ]).skip(skip).limit(limit);

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      users
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const search = async (req, res, next) => {
  const { query } = req.params;

  try {
    // Tìm user theo name
    const users = await User.find({ username: new RegExp(query, 'i') });

    // Tìm book theo title
    const books = await Book.find({ title: new RegExp(query, 'i') });

    // Kết hợp kết quả tìm kiếm từ cả hai truy vấn
    const results = {
      users,
      books
    };

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export {
  getAbout,
  getLeaderBoard,
  search
}