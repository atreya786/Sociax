import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";
import { toast } from "react-toastify";

// Fetch comments for a post
export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      return { postId, comments: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Add a comment
export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ postId, text }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, { text });
      return { postId, comment: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      await api.delete(`/posts/${postId}/comments/${commentId}`);
      return { postId, commentId };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initial state
const initialState = {
  commentsByPost: {},
  isLoading: false,
  error: null,
};

// Comment slice
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commentsByPost[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;

        if (!state.commentsByPost[postId]) {
          state.commentsByPost[postId] = [];
        }
        toast.success("Comment added successfully");

        state.commentsByPost[postId].push(comment);
      })

      // Delete comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        toast.info("Comment deleted successfully");

        state.commentsByPost[postId] = state.commentsByPost[postId].filter(
          (comment) => comment._id !== commentId
        );
      });
  },
});

export default commentSlice.reducer;
