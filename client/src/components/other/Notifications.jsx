import React from "react";
import { ArrowIcon, CloseIcon, NotificationIcon } from "../../svg";

const Notification = () => {
  return (
    <div className="h-[90px] dark:bg-dark_bg_3 flex items-center p-[13px] ">
      {/* Container */}
      <div className="w-full flex items-center justify-between ">
        {/* Left */}
        <div className="flex items-center gap-x-4">
          <NotificationIcon className="dark:fill-blue_1 cursor-pointer" />
          <div className="flex flex-col">
            <span className="textPrimary">Get notified of new message</span>
            <span className="textSecondray mt-0.5 flex items-center gap-0.5 ">
              Turn on desktop notifications
              <ArrowIcon className="dark:fill-dark_svg_2 cursor-pointer mt-1" />
            </span>
          </div>
        </div>
        {/* Right */}
        <div className="flex">
          <CloseIcon className="dark:fill-dark_svg_2 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Notification;
