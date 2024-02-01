import React from "react";
import SidebarHeader from "./SidebarHeader";
import Notification from "../Notifications";
import Search from "../Search";
import Conversation from "../conversation/Conversation";

const Sidebar = () => {
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* header */}
      <SidebarHeader />
      {/* notifications */}
      <Notification />
      {/* search */}
      <Search searchLength="0" />
      {/* conversation */}
      <Conversation />
    </div>
  );
};

export default Sidebar;
