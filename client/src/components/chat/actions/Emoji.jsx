import React from 'react'
import { EmojiIcon } from "../../../svg";

const Emoji = () => {
  return (
    <li>
        <button className='btn'>
            <EmojiIcon className="dark:fill-dark_svg_1"/>
        </button>
        {/**Emoji picker */}
    </li>
  )
}

export default Emoji