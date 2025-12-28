import Comment from "../models/Comment.js";

// Fetch comments for a post
export const fetchComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate("user", "username avatar");

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Fetch comments failed" });
  }
};

// Add comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const comment = await Comment.create({
      post: postId,
      user: req.user._id,
      text,
    });

    const populatedComment = await comment.populate("user", "username avatar");

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: "Add comment failed" });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only comment owner can delete
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete comment failed" });
  }
};
