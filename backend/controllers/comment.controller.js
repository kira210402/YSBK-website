import Comment from "../models/comment.model.js";

const update = async(req, res, next) => {
  const {id} = req.params;
  try {
    const foundComment = await Comment.findById(id);

    if(!foundComment) return res.status(404).json({message: "Comment not found"});

    if(foundComment.userId === req.payload.sub) {
      const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {new: true});

      return res.status(200).json(updatedComment);
    } else return res.status(403).json({message: "You are not allowed to update this comment!"});
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteComment = async(req, res, next) => {
  const {id} = req.params;
  try {
    const foundComment = await Comment.findById(id);

    if(!foundComment) return res.status(404).json({message: "Comment not found!"});

    if(req.payload.role === "Admin" || foundComment.userId === req.payload.sub) {
      const deletedComment = await Comment.findByIdAndDelete(id);

      return res.status(200).json({message: "Delete successfully!", deletedComment});
    } else return res.status(403).json({message: "Only admin or comment's owner can delete this comment!"});
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export {
  update,
  deleteComment,
}