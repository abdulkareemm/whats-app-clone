import React, { useRef } from "react";
import { DocumentIcon } from "../../../../svg";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../features/chatSlice";

const Document = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const documentHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
        file.type !== "application/pdf" &&
        file.type !== "text/plan" &&
        file.type !== "application/msword" &&
        file.type !== "application/zip"
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
          dispatch(addFiles({ file: file, type: file.type.split("/")[1] }));
        };
      }
    });
  };
  return (
    <li>
      <button
        className="bg-[#5F66CD] rounded-full"
        type="button"
        onClick={() => inputRef.current.click()}
      >
        <DocumentIcon />
        <input
          type="file"
          hidden
          ref={inputRef}
          accept="application/pdf"
          onChange={documentHandler}
        />
      </button>
    </li>
  );
};

export default Document;
