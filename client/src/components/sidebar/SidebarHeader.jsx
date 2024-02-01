import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../svg";
import Menu from "./Menu";

const SidebarHeader = () => {
  const { user } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p-[16px]">
      {/* Container */}
      <div className="w-full flex items-center justify-between ">
        {/* user image */}
        <button className="btn">
          <img
            src={user.picture}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </button>
        {/* user image */}
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <CommunityIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <StoryIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <ChatIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li className="relative">
            <button
              className={`btn ${showMenu ? "bg-dark_hover_1" : ""}`}
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <DotsIcon className="dark:fill-dark_svg_1 cursor-pointer" />
            </button>
            {showMenu && <Menu />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarHeader;
