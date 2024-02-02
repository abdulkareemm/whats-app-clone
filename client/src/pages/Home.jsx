import React, { useEffect } from "react";
import { Chat, Sidebar, WhatsappHome } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chatSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  // getConversation
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);
  return (
    <div className="h-screen  dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/* container */}
      <div className="container h-screen flex py-[19px]">
        {/* sidebar */}
        <Sidebar />
        {/* chat */}
        {Object.keys(activeConversation).length!==0 ? <Chat/> : <WhatsappHome />}
      </div>
    </div>
  );
};

export default Home;
