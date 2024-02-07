import React, { useEffect, useState } from "react";
import { Chat, Sidebar, WhatsappHome } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, updateMessages } from "../features/chatSlice";
import SocketContext from "../context/SocketContext";
import { getRecevierId } from "../utils/help";

function Home  ({socket}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers,setOnlineUsers] = useState([])
  // join user to socket
  useEffect(()=>{
    socket.emit("join",user)
    // get online users
    socket.on("get-online-users",users=>{
      setOnlineUsers(users)
    })
  },[user])
  // getConversation
  
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  //  listening to receive message event
  useEffect(()=>{
    socket.on('receive message',message=>{
      console.log(message)
      dispatch(updateMessages(message));
    })
  },[])

  return (
    <div className="h-screen  dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/* container */}
      <div className="container h-screen flex py-[19px]">
        {/* sidebar */}
        <Sidebar onlineUsers={onlineUsers} />
        {/* chat */}
        {Object.keys(activeConversation).length !== 0 ? (
          <Chat online = {onlineUsers.find(u=>u.userId===getRecevierId(user._id,activeConversation.users))}/>
        ) : (
          <WhatsappHome />
        )}
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
