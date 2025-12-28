import express from "express";
import {
  addComment,
  deleteComment,
  fetchComments,
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:postId", authMiddleware, fetchComments);
router.post("/:postId", authMiddleware, addComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
