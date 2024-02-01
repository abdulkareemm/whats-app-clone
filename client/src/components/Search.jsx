import React, { useState } from "react";
import { FilterIcon, ReturnIcon, SearchIcon } from "../svg";

const Search = ({ searchLength }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="h-[49px] py-1.5 ">
      {/* Container */}
      <div className="px-[10px]">
        {/* Search input container */}
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span className="w-8 flex items-center justify-center rotateAnimation">
                <ReturnIcon className="fill-green_1 w-5 cursor-pointer" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center ">
                <SearchIcon className="fill-dark_svg_2 w-5 cursor-pointer" />
              </span>
            )}
            <input
              type="text"
              className="input"
              placeholder="Search or start a new chat"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength == 0 && setShow(false)}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
