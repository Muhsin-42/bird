"use client";
import useLike from "@/hooks/useLike";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ActionsSection = ({
  isComment,
  id,
  comments,
  currentUserId,
  like,
// }: {isComment:boolean,id:string,comments:string[],currentUserId:string,like:any}) => {
}: any) => {
  const { isLiked, likeCount, handleLike } = useLike(like, id, currentUserId);

  return (
    <div className={`mt-5 flex flex-col gap-3 ${isComment && "pb-3"}`}>
      <div className="flex gap-3.5">
        <div className="flex gap-1">
          <Image
            src={`/assets/heart${isLiked ? "-filled" : "-gray"}.svg`}
            alt="heart"
            width={24}
            height={24}
            className="cursor-pointer object-contain animate-pulse"
            onClick={handleLike}
          />
          <span className="text-gray-1">{likeCount}</span>
        </div>

        <Link href={`/thread/${id}`}>
          <Image
            src="/assets/reply.svg"
            alt="reply"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Image
          src="/assets/repost.svg"
          alt="repost"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
        <Image
          src="/assets/share.svg"
          alt="share"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </div>

      {comments?.length > 0 && (
        <Link href={`/thread/${id}`}>
          <p className="mt-1 text-subtle-medium text-gray-1">
            {comments.length} replies
          </p>
        </Link>
      )}
    </div>
  );
};

export default ActionsSection;
