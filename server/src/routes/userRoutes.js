import express from "express";
import { toggleFollow } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Follow / Unfollow
router.put("/:id/follow", authMiddleware, toggleFollow);

export default router;
