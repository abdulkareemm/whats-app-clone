import React, { useEffect } from "react";
import Header from "./Header";
import Message from "./messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessage } from "../../features/chatSlice";
import { ChatActions } from "./actions";

const Chat = () => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const values = {
    convo_id: activeConversation._id,
    token: user.token,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(activeConversation).length > 0) {
      dispatch(getConversationMessage(values));
    }
  }, [activeConversation]);
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none">
      {/* Container */}
      <div>
        {/* Header */}
        <Header />
        {/* Messages */}
        <Message />
        {/**Chat actions */}
        <ChatActions/>
      </div>
    </div>
  );
};

export default Chat;
