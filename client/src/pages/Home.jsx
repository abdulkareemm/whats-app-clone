import React, { useEffect } from "react";
import { Chat, Sidebar, WhatsappHome } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chatSlice";
import SocketContext from "../context/SocketContext";

function Home  ({socket}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  useEffect(()=>{
    socket.emit("join",user)
  },[user])
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
const HomeWithSocket = (props)=>{
  return <SocketContext.Consumer>
    {(socket)=><Home {...props} socket={socket}/>}
  </SocketContext.Consumer>
}

export default HomeWithSocket;
