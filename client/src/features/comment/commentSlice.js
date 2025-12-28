import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";
import { toast } from "react-toastify";

// Fetch comments for a post
export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (postId, { rejectWithValue }) => {
    try {
      // If you don’t have this backend route yet, you can remove this thunk
      const res = await api.get(`/comments/${postId}`);
      return { postId, comments: res.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch comments"
      );
    }
  }
);

// Add a comment
export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ postId, text }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/comments/${postId}`, { text });
      return { postId, comment: res.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add comment"
      );
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      await api.delete(`/comments/${commentId}`);
      return { postId, commentId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete comment"
      );
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

        state.commentsByPost[postId].push(comment);
        toast.success("Comment added successfully");
      })

      // Delete comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;

        state.commentsByPost[postId] = state.commentsByPost[postId].filter(
          (comment) => comment._id !== commentId
        );

        toast.info("Comment deleted successfully");
      });
  },
});

export default commentSlice.reducer;
