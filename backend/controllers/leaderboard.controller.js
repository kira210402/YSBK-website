import User from "../models/user.model.js";

const getLeaderBoard = async (req, res, next) => {
  try {
    const users = await User.aggregate([
      {
        $sort: { score: -1 } // Sắp xếp theo score từ lớn đến bé
      }
    ]);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export {
  getLeaderBoard,
}