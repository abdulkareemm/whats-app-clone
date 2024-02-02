import React from "react";
import { useSelector } from "react-redux";
import SingleConversation from "./SingleConversation";

const Conversation = () => {
  const { conversation } = useSelector((state) => state.chat);
  return (
    <div className="convos scrollbar">
      <ul>
        {conversation &&
          conversation.map((convo, id) => {
            if (convo.latestMessage?.message.length > 0)
              return (
                <SingleConversation
                  convo={convo}
                  key={convo._id}
                  lastItem={id + 1 === conversation.length ? true : false}
                />
              );
          })}
      </ul>
    </div>
  );
};

export default Conversation;
