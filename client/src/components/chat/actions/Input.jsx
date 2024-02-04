import React from "react";

const Input = ({message,setMessage}) => {
    const onchangeHandler = (e)=>{
        setMessage(e.target.value)
    }
  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none w-full h-[45px] rounded-lg flex-1 pl-4"
        placeholder="Type a message"
        value={message}
        onChange={onchangeHandler}
      />
    </div>
  );
};

export default Input;
