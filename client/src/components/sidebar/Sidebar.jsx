import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import Notification from "../other/Notifications";
import Search from "../search/Search";
import Conversation from "../conversation/Conversation";
import SearchResult from "../search/SearchResult";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* header */}
      <SidebarHeader />
      {/* notifications */}
      <Notification />
      {/* search */}
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <>
          <SearchResult searchResult={searchResults} />
        </>
      ) : (
        <>
          {/* conversation */}
          <Conversation />
        </>
      )}
    </div>
  );
};

export default Sidebar;
