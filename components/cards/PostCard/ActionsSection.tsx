"use client";
import DeleteModal from "@/components/shared/DeleteModal";
import useLike from "@/hooks/useLike";
import { IActionsSection } from "@/interfaces/propInterfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ActionsSection = ({
  isComment,
  id,
  comments,
  currentUserId,
  like,
  author
}: IActionsSection) => {
  const { isLiked, likeCount, handleLike } = useLike(like, id, currentUserId);
  const [deleteHover,setDeleteHover] = useState(false); 
  const [deleteModalShow,setDeleteModalShow] = useState(false);

  return (
    <div className={`mt-5 flex flex-col gap-3 ${isComment && "pb-3"}`}>
      <div className="flex gap-3.5 justify-betweend">
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
        {
          author?._id=== currentUserId &&
          <Image
            onMouseOver={()=>setDeleteHover(true)}
            onMouseLeave={()=>setDeleteHover(false)}
            onClick={()=>setDeleteModalShow(true)}
            src={`/assets/delete${!deleteHover?'-gray':''}.svg`}
            alt="share"
            width={20}
            height={20}
            className="cursor-pointer object-contain"
          />
        }
      </div>

      {comments?.length > 0 && (
        <Link href={`/thread/${id}`}>
          <p className="mt-1 text-subtle-medium text-gray-1">
            {comments?.length} replies
          </p>
        </Link>
      )}

{
  // id==='65586163ef619470f62d61d2' && <DeleteModal/>
  deleteModalShow && <DeleteModal id={id} onClose={()=>setDeleteModalShow(false)} show={deleteModalShow}  />
}
    </div>
  );
};

export default ActionsSection;
