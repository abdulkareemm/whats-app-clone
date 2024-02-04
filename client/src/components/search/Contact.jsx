import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { open_create_conversation } from '../../features/chatSlice';

const Contact = ({ contact, lastItem, setSearchResults }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const values = {
    receiver_id: contact._id,
    token: user.token,
  };
  return (
    <li
      onClick={() => {
        dispatch(open_create_conversation(values));
        setSearchResults([])
      }}
      className="list-none h[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]   "
    >
      {/* Container */}
      <div className="flex items-center gap-x-3 py-[10px] ">
        {/* Contact */}
        <div className="flex items-center gap-x-3">
          {/* Conversation user picture */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={contact.picture}
              alt={contact.name}
              className="h-full w-full object-cover"
            />
          </div>
          {/* user name and status */}
          <div className="w-full flex flex-col">
            {/* user name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {contact.name}
            </h1>
            {/* user status */}

            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{contact.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!lastItem && (
        <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
      )}
    </li>
  );
};

export default Contact