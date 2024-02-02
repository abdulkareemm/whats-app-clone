import moment from "moment";
import React from "react";
import { TriangleIcon } from "../../../svg";

const Message = ({ message, me }) => {
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      {/**Message Container */}
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
            me ? "bg-green_3" : "dark:bg-dark_bg_2"
          }`}
        >
          {/**Message */}
          <p className="float-left h-full text-sm pb-5 ">{message.message}</p>
          {/**Message Dare */}
          <span className="float-right text-xs pt-6 text-dark_text_5">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          {/**Triangle */}
          {me ? (
            <span>
              <TriangleIcon
                className={` fill-green_3 absolute -top-0 -right-5`}
                points={"0,0,0,25,25,0"}
              />
            </span>
          ) : (
            <TriangleIcon
              className={`dark:fill-dark_bg_2 absolute -top-0 -left-5`}
              points={"0,0,25,0,25,25"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
