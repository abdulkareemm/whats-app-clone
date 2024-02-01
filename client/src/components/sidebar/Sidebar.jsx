import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import Notification from "../Notifications";
import Search from "../Search";
import Conversation from "../conversation/Conversation";

const Sidebar = () => {
  const [searchResults,setSearchResults] = useState([])
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* header */}
      <SidebarHeader /> 
      {/* notifications */}
      <Notification />
      {/* search */}
      <Search searchLength={searchResults.length} setSearchResults ={setSearchResults}/>
      {/* conversation */}
      <Conversation />
    </div>
  );
};

export default Sidebar;
