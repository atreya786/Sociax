import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Signup
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  res.status(201).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    token: generateToken(user._id),
  });
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.status(200).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
    token: generateToken(user._id),
  });
};
