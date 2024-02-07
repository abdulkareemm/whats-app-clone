import React from "react";
import { useSelector } from "react-redux";
import SingleConversation from "./SingleConversation";
import { getRecevierId } from "../../utils/help";

const Conversation = ({ onlineUsers }) => {
  const {user} = useSelector(state=>state.user)
  const { conversation, activeConversation } = useSelector(
    (state) => state.chat
  );
  return (
    <div className="convos scrollbar">
      <ul>
        {conversation &&
          conversation
            .filter((c) => c.latestMessage)
            .map((convo, id) => {
              let check =  onlineUsers.find(u=>u.userId===getRecevierId(user._id,convo.users))
              return (
                <SingleConversation
                  convo={convo}
                  key={convo._id}
                  lastItem={id + 1 === conversation.length ? true : false}
                  check={check?true:false}
                />
              );
            })}
      </ul>
    </div>
  );
};

export default Conversation;
