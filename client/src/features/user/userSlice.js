import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";
import { toast } from "react-toastify";

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Follow or unfollow user
export const toggleFollow = createAsyncThunk(
  "user/toggleFollow",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}/follow`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initial state
const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Follow or unfollow
      .addCase(toggleFollow.fulfilled, (state, action) => {
        state.profile = action.payload;
        toast.success(
          action.payload.isFollowing ? "Started following" : "Unfollowed"
        );
      });
  },
});

export default userSlice.reducer;
