import React, { useEffect } from 'react'
import { Sidebar } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from "../features/chatSlice";


const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // getConversation
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/* container */}
      <div className="container h-screen flex py-[19px]">
        {/* sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}

export default Home