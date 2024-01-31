import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;
const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};
export const registerUser = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
        ...values,
      });

      return data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        return rejectWithValue(error.response.data.error.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
    changeStatus: (state, actions) => {
      state.status = actions.payload;
      state.error = "";
    },
    changeError: (state, actions) => {
      state.status = actions.payload.status;
      state.error = actions.payload.error;
    },
  },
   extraReducers(builder){
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "Successed";
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload;
      })
}});

export const { logout, changeStatus, changeError } = userSlice.actions;
export default userSlice;
