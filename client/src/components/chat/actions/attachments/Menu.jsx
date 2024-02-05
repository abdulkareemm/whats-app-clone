import React from 'react'
import { CameraIcon, ContactIcon, DocumentIcon, PhotoIcon, PollIcon, StickerIcon } from '../../../../svg'

const Menu = () => {
  return (
    <ul className="absolute bottom-12 openEmojiAnimation">
      <li>
        <button className="rounded-full" type="button">
          <PollIcon />
        </button>
      </li>
      <li>
        <button className="bg-[#0EABF4] rounded-full" type="button">
          <ContactIcon />
        </button>
      </li>
      <li>
        <button className="bg-[#5F66CD] rounded-full" type="button">
          <DocumentIcon />
        </button>
      </li>
      <li>
        <button className="bg-[#D3396D] rounded-full" type="button">
          <CameraIcon />
        </button>
      </li>
      <li>
        <button className="rounded-full" type="button">
          <StickerIcon />
        </button>
      </li>
      <li>
        <button className="bg-[#BF59CF] rounded-full" type="button">
          <PhotoIcon />
        </button>
      </li>
    </ul>
  );
}

export default Menu