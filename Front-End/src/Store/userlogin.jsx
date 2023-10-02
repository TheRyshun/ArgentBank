/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (userCredential) => {
    const request = await axios.post(
      "http://localhost:3001/api/v1/user/login/",
      userCredential
    );
    localStorage.setItem("user", request.data.body.token);
    return request.data.body.token;
  }
);

const LoginSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null,
  },

  reducers: {
    logOutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 400") {
          state.error = "Access Debied! Invalid Personnal information";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { logOutUser } = LoginSlice.actions;
export default LoginSlice.reducer;
