import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("user");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUserAccount = createAsyncThunk("user/account", async () => {
  const request = await axios.post(
    `http://localhost:3001/api/v1/user/profile/`
  );
  return request.data;
});

const userAccountSlice = createSlice({
  name: "UserAccount",
  initialState: {
    loading: false,
    userAccount: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.userAccount = action.payload;
      })

      .addCase(getUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userAccountSlice.reducer;
