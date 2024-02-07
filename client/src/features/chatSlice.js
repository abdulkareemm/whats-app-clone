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
export const open_create_conversation = createAsyncThunk(
  "conversation/open_create",
  async (values, { rejectWithValue }) => {
    const { token, receiver_id } = values;
    try {
      const { data } = await axios.post(
        `${CONVERSATION_ENDPOINT}`,
        { receiver_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
export const getConversationMessage = createAsyncThunk(
  "message/get",
  async (values, { rejectWithValue }) => {
    const { token, convo_id } = values;
    try {
      const { data } = await axios.get(`${MESSAGE_ENDPOINT}/${convo_id}`, {
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
export const sendMessage = createAsyncThunk(
  "message/send",
  async (values, { rejectWithValue }) => {
    const { token, message, convo_id, files } = values;
    try {
      const { data } = await axios.post(
        MESSAGE_ENDPOINT,
        { message, convo_id, files },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    updateMessages : (state,actions)=>{
      let oldMessages = [...state.messages]
      oldMessages.push(actions.payload);
      state.messages = oldMessages
      let conversation = {
        ...actions.payload.conversation,
        latestMessage: actions.payload,
      };
      let newConversation = [...state.conversation].filter(
        (c) => c._id !== conversation._id
      );
      newConversation.unshift(conversation);
      state.conversation = newConversation;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, actions) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, actions) => {
        state.status = "Succeed";
        state.conversation = actions.payload;
      })
      .addCase(getConversations.rejected, (state, actions) => {
        state.status = "failed";
        state.error = actions.payload;
      })
      .addCase(open_create_conversation.pending, (state, actions) => {
        state.status = "loading";
      })
      .addCase(open_create_conversation.fulfilled, (state, actions) => {
        state.status = "Succeed";
        state.activeConversation = actions.payload;
      })
      .addCase(open_create_conversation.rejected, (state, actions) => {
        state.status = "failed";
        state.error = actions.payload;
      })
      .addCase(getConversationMessage.pending, (state, actions) => {
        state.status = "loading";
      })
      .addCase(getConversationMessage.fulfilled, (state, actions) => {
        state.status = "Succeed";
        state.messages = actions.payload;
      })
      .addCase(getConversationMessage.rejected, (state, actions) => {
        state.status = "failed";
        state.error = actions.payload;
      })
      .addCase(sendMessage.pending, (state, actions) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, actions) => {
        state.status = "Succeed";
        state.messages = [...state.messages, actions.payload];
        let conversation = {
          ...actions.payload.conversation,
          latestMessage: actions.payload,
        };
        let newConversation = [...state.conversation].filter(c=>c._id!==conversation._id);
        newConversation.unshift(conversation)
        state.conversation = newConversation
      })
      .addCase(sendMessage.rejected, (state, actions) => {
        state.status = "failed";
        state.error = actions.payload;
      });
  },
});
export const { setActiveConversation, updateMessages } = chatSlice.actions;
export default chatSlice;
