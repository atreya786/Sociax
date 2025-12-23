import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";
import { createPostAPI } from "./postAPI";
import { toast } from "react-toastify";

// Fetch posts with pagination
export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts?page=${page}&limit=5`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Like or unlike a post
export const toggleLike = createAsyncThunk(
  "post/toggleLike",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      return await createPostAPI(formData);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initial state
const initialState = {
  posts: [],
  page: 1,
  hasMore: true,
  isLoading: false,
  error: null,
};

// Post slice
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPosts(state) {
      state.posts = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = [...state.posts, ...action.payload.posts];
        state.page += 1;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Toggle like success
      .addCase(toggleLike.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        toast.success("Post like status updated");

        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
      })

      // Create post success
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
        toast.success("Post created successfully");
      })
      .addCase(createPost.rejected, (state, action) => {
        toast.error(action.payload || "Post creation failed");
      });
  },
});

export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;
