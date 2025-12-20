import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";

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

        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
      });
  },
});

export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;
