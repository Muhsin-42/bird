import Image from "next/image";
import React from "react";

const PostPopBtn = () => {
  return (
    <button
      type="button"
      title="post"
      className="peer fixed bottom-20 right-5 cursor-pointer 
      rounded-full  bg-primary-500 p-3 text-white shadow-2xl hover:scale-105 sm:bottom-28 md:bottom-5"
    >
      <Image src="/assets/twt.webp" width={30} height={30} alt="post" />
    </button>
  );
};

export default PostPopBtn;
