import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("user");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const profilupdate = createAsyncThunk(
  "user/update",
  async (UpdateUser) => {
    const request = await axios.put(
      `http://localhost:3001/api/v1/user/profile/`,
      UpdateUser
    );
    return request.data;
  }
);

const profilupdateSlice = createSlice({
    name : "updateAccount",
    initialState : {
        loading : false,
        userProfile : null,
        error : null,
    },
    extraReducers : (builder) => {
        builder
        .addCase(profilupdate.pending, (state) => {
            state.loading = true;
        })

        .addCase (profilupdate.fulfilled, (state, action) => {
            state.loading = false;
            state.userProfile = action.payload
        })
        .addCase (profilupdate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.message.error;
            console.error("Error updating profile :", action.error);
        })
    }
})

export default profilupdateSlice.reducer