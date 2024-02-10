import React, { useRef } from "react";
import { PhotoIcon } from "../../../../svg";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../features/chatSlice";

const Photo = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const imageHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif" &&
        file.type !== "image/webp" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "video/webm"
      ) {
        // remove file not image
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 5) {
        // remove image with size bigger than 5 megabyte
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          dispatch(
            addFiles({
              file: file,
              fileData: e.target.result,
              type: file.type.split("/")[0],
            })
          );
        };
      }
    });
  };
  return (
    <li>
      <button
        className="bg-[#BF59CF] rounded-full"
        type="button"
        onClick={() => inputRef.current.click()}
      >
        <PhotoIcon />
        <input
          type="file"
          hidden
          ref={inputRef}
          accept="image/png,image/jpeg,image/gif,image/webp"
          onChange={imageHandler}
        />
      </button>
    </li>
  );
};

export default Photo;
