import React, { useRef } from "react";
import { PhotoIcon } from "../../../../svg";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../features/chatSlice";

const Photo = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const imageHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== "image/png" &&
        img.type !== "image/jpeg" &&
        img.type !== "image/gif" &&
        img.type !== "image/webp"
      ) {
        // remove file not image
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        // remove image with size bigger than 5 megabyte
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          dispatch(
            addFiles({ file: img, imgData: e.target.result, type: "image" })
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
