import React, { useState } from "react";
import { FilterIcon, ReturnIcon, SearchIcon } from "../svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Search = ({ searchLength, setSearchResults }) => {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.user);
  const handleSearch = async (e) => {
    if (e.target.value && e.key === "Enter") {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setSearchResults(data);
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    } else {
      setSearchResults([]);
    }
  };

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
              onKeyDown={(e) => handleSearch(e)}
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
