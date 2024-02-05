import React, { useState } from "react";
import { AttachmentIcon } from "../../../../svg";
import {Menu} from "./";

const Attachments = ({
  showAttachments,
  setShowAttachments,
  setShowEmojiPicker,
}) => {
  return (
    <li className="relative">
      <button
        className="btn"
        type="button"
        onClick={() => {
          setShowAttachments(prev=>!prev)
          setShowEmojiPicker(false);
        }}
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {/**Menu */}
      {showAttachments && <Menu />}
    </li>
  );
};

export default Attachments;
