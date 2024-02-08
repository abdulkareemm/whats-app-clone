import React from 'react'
import { CameraIcon, ContactIcon, DocumentIcon, PollIcon, StickerIcon } from '../../../../svg'
import { DocumentAttachment, PhotoAttachment } from '.';

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
      <DocumentAttachment/>
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
      <PhotoAttachment/>
    </ul>
  );
}

export default Menu