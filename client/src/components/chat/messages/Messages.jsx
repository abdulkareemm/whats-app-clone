import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const Messages = () => {
  const {messages} = useSelector(state=>state.chat)
  const {user} = useSelector(state=>state.user)
  return (
    <div
      className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
    bg-cover bg-no-repeat h-screen"
    >
      {/* Container */}
      <div className="scrollbar overflow-scrollbar overflow-auto py-2 px-[5%]">
        {/*Messages*/}
        {
          messages && messages.map(message=>{
            return <Message message={message} key={message._id} me={user._id===message.sender._id}/>
          })
        }
      </div>
    </div>
  );
};

export default Messages;
