import React, { useEffect, useState } from "react";
import { CloseIcon, EmojiIcon } from "../../../svg";
import EmojiPicker from "emoji-picker-react";

const Emoji = ({
  textRef,
  message,
  setMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  setShowAttachments,
}) => {
  const [cursorPosition, setCursorPosition] = useState("");
  useEffect(() => {
    return () => {
      if (cursorPosition) textRef.current.selectionEnd = cursorPosition;
    };
  }, [cursorPosition]);

  const handleEmoji = (emojiData, e) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };

  return (
    <li>
      <button
        className="btn"
        type="button"
        onClick={() => {
          setShowEmojiPicker((prev) => !prev);
          setShowAttachments(false);
        }}
      >
        <EmojiIcon className="dark:fill-dark_svg_1" />
      </button>
      {/**Emoji picker */}
      {showEmojiPicker && (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
};

export default Emoji;
