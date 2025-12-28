import cloudinary from "../config/cloudinary.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file required" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "sociax_posts",
    });

    const post = await Post.create({
      user: req.user._id,
      caption: req.body.caption,
      image: result.secure_url,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Create post failed" });
  }
};

// Get feed (paginated)
export const getFeed = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username avatar")
      .populate("likes", "username");

    const total = await Post.countDocuments();

    res.status(200).json({
      posts,
      hasMore: skip + posts.length < total,
    });
  } catch (error) {
    res.status(500).json({ message: "Fetch feed failed" });
  }
};

// Like / Unlike post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      postId: post._id,
      likes: post.likes,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Create post failed" });
  }
};
