import React from 'react'

const Input = () => {
  return (
    <div className='w-full'>
        <input type="text" className='dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] rounded-lg flex-1 pl-4'
        placeholder='Type a message' />
    </div>
  )
}

export default Input