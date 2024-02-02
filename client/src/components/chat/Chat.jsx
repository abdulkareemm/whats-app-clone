import React from 'react'
import Header from './Header'

const Chat = () => {
  return (
    <div className='relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden'>
        {/* Container */}
        <div>
            {/* Header */}
            <Header/>
        </div>
    </div>
  )
}

export default Chat