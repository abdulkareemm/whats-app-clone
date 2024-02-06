import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dateHandler,
  getRecevierImage,
  getRecevierName,
  getRecevierId,
} from "../../utils/help";
import { open_create_conversation } from "../../features/chatSlice";
import SocketContext from "../../context/SocketContext";

export function SingleConversation({ convo, lastItem, socket }) {
  const { user } = useSelector((state) => state.user);
  const {activeConversation} = useSelector(state=>state.chat)
  const values = {
    receiver_id: getRecevierId(user._id, convo.users),
    token: user.token,
  };
  const dispatch = useDispatch();
  const openConversation = async() => {
    let newConvo = await dispatch(open_create_conversation(values));

    socket.emit("join conversation", newConvo.payload._id);
  };
  return (
    <li
      className={`list-none h-[72px] w-full dark:bg-dark_1 hover:${
        convo._id !== activeConversation._id ? "dark:bg-dark_bg_2" : ""
      } cursor-pointer dark:text-dark_text_1 px-[10px] ${
        convo._id === activeConversation._id ? "dark:bg-dark_hover_1" : ""
      }`}
      onClick={() => openConversation()}
    >
      {/* Container */}
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* Left */}
        <div className="flex items-center gap-x-3">
          {/* Conversation user picture */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={
                convo.isGroup
                  ? convo.picture
                  : getRecevierImage(user._id, convo.users)
              }
              alt={convo.name}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Conversation name and message */}
          <div className="w-full flex flex-col">
            {/* Conversation name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {convo.isGroup
                ? convo.name
                : getRecevierName(user._id, convo.users)}
            </h1>
            {/* Conversation message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>
                    {convo.latestMessage?.message.length > 30
                      ? `${convo.latestMessage.message.substring(0, 40)}...`
                      : convo.latestMessage?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {dateHandler(convo.latestMessage.createdAt)}
          </span>
        </div>
      </div>
      {/* Border */}
      {!lastItem && (
        <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
      )}
    </li>
  );
}

const ConversationWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <SingleConversation {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ConversationWithSocket;
