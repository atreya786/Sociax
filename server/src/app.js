import express from "express";
import cors from "cors";
import morgan from "morgan";

import authMiddleware from "./middleware/authMiddleware.js";

import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Routes
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
