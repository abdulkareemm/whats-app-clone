import React, { useRef, useState } from "react";
import { Attachments, EmojiPicker, Input } from ".";
import { SendIcon } from "../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../features/chatSlice";
import {ClipLoader} from "react-spinners"

const Chat = () => {
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  const { activeConversation ,status } = useSelector((state) => state.chat);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachments, setShowAttachments] = useState(false);

  const { token } = user;
  const textRef = useRef()
  const dispatch = useDispatch();
  const values = { token, convo_id: activeConversation._id, message };
  const onSendHandler = async (e) => {
    e.preventDefault();
    await dispatch(sendMessage(values));
    setMessage("");
  };

  return (
    <form
      onSubmit={(e) => onSendHandler(e)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      {/* Container */}
      <div className="w-full flex items-center gap-x-2 ">
        {/**Emojis and attachments  */}
        <ul className="flex gap-x-2">
          <EmojiPicker
            textRef={textRef}
            message={message}
            setMessage={setMessage}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            setShowAttachments={setShowAttachments}
          />
          <Attachments setShowAttachments={setShowAttachments} showAttachments={showAttachments} setShowEmojiPicker={setShowEmojiPicker} />
        </ul>
        {/**Input */}
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        {/**Send button */}
        {status === "loading" ? (
          <div className="btn">
            <ClipLoader color="#E9EdEF" size={25} />
          </div>
        ) : (
          <button className="btn">
            <SendIcon className="dark:fill-dark_svg_1" />
          </button>
        )}
      </div>
    </form>
  );
};

export default Chat;
