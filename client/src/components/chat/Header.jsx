import React from "react";
import { useSelector } from "react-redux";
import {
  capitalize,
  getRecevierImage,
  getRecevierName,
} from "../../utils/help";
import { DotsIcon, SearchIcon } from "../../svg";

const Header = () => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p-[16px] select-none">
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-x-4 ">
          {/* Conversation image */}
          <button className="btn">
            <img
              src={getRecevierImage(user._id, activeConversation.users)}
              alt={getRecevierName(user._id, activeConversation.users)}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <div className="flex flex-col ">
            <h1 className="dark:text-white text-md font-bold">
              {capitalize(
                getRecevierName(user._id, activeConversation.users).split(
                  " "
                )[0]
              )}
            </h1>
            <span className="text-ts dark:text-dark_svg_2">online</span>
          </div>
        </div>
        {/* right */}
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <SearchIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
