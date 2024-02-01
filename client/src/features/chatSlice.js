import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

const initialState = {
  status: "",
  error: "",
  conversation: [],
  activeConversation: {},
  messages: [],
  noifications: [],
  files: [],
};

// functions
export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${CONVERSATION_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.error.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, actions) => {
      state.activeConversation = actions.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, actions) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, actions) => {
        state.status = "Succeed";
        console.log(actions.payload);
        state.conversation = actions.payload;
      })
      .addCase(getConversations.rejected, (state, actions) => {
        state.status = "failed";
        state.error = actions.payload;
      });
  },
});
export const { setActiveConversation } = chatSlice.actions;
export default chatSlice;
