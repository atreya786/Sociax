import express from "express";
import {
  createPost,
  getFeed,
  toggleLike,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost);
router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getFeed);
router.put("/:id/like", authMiddleware, toggleLike);

export default router;
