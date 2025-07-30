import Image from 'next/image';
import React from 'react';

const PostPopBtn = () => {
  return (
    <button
      className="peer fixed right-5 bottom-20 cursor-pointer rounded-full bg-primary-500 p-3 text-white shadow-2xl hover:scale-105 sm:bottom-28 md:bottom-5"
      title="post"
      type="button"
    >
      <Image alt="post" height={30} src="/assets/twt.webp" width={30} />
    </button>
  );
};

export default PostPopBtn;
