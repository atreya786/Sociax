import express from "express";
import cors from "cors";
import morgan from "morgan";
// Routes
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);


// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
