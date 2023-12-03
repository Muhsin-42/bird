import Image from "next/image";
import React from "react";

const PostPopBtn = () => {
  return (
    <button
      type="button"
      title="post"
      className="bg-primary-500 p-3 shadow-2xl rounded-full text-white 
      fixed  bottom-20 sm:bottom-28 md:bottom-5 right-5 cursor-pointer hover:scale-105 peer"
    >
      <Image src="/assets/twt.webp" width={30} height={30} alt="post" />
    </button>
  );
};

export default PostPopBtn;
