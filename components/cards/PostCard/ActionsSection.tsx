"use client";
import DeleteModal from "@/components/shared/DeleteModal";
import useLike from "@/hooks/useLike";
import { IActionsSection } from "@/interfaces/propInterfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ShareComponent from "./ShareComponent";
import conf from "@/conf/config";
import useBookmark from "@/hooks/useBookmark";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
const ActionsSection = ({
  isComment,
  id,
  comments,
  currentUserId,
  like,
  bookmark,
  author,
}: IActionsSection) => {
  const { isLiked, likeCount, handleLike } = useLike(like, id, currentUserId);
  const { isBookmarked, bookmarkCount, handleBookmark } = useBookmark(
    bookmark,
    id,
    currentUserId
  );
  const [deleteHover, setDeleteHover] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const shareUrl = `${conf.BASE_URL}/thread/${author?.name}/${id}`;

  return (
    <div className={`mt-5 flex flex-col gap-3 ${isComment && "pb-3"}`}>
      <div className="flex gap-4">
        <div className="flex gap-1">
          <Image
            src={`/assets/heart${isLiked ? "-filled" : "-gray"}.svg`}
            alt="heart"
            width={24}
            height={24}
            className="animate-pulse cursor-pointer object-contain"
            onClick={handleLike}
          />
          <span className="text-gray-1">{likeCount}</span>
        </div>

        <Link href={`/thread/${author?.name}/${id}`}>
          <Image
            src="/assets/reply.svg"
            alt="reply"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        </Link>

        <ShareComponent shareUrl={shareUrl} />

        <div className="flex items-center gap-1">
          {isBookmarked ? (
            <GoBookmarkFill
              className={"cursor-pointer text-[#5C5C7B]"}
              size={"1.2rem"}
              onClick={handleBookmark}
            />
          ) : (
            <GoBookmark
              className={"cursor-pointer text-[#5C5C7B]"}
              size={"1.2rem"}
              onClick={handleBookmark}
            />
          )}
          <span className="text-gray-1">{bookmarkCount}</span>
          {/* <span className="text-gray-1">55</span> */}
        </div>

        {author?._id === currentUserId && (
          <Image
            onMouseOver={() => setDeleteHover(true)}
            onMouseLeave={() => setDeleteHover(false)}
            onClick={() => setDeleteModalShow(true)}
            src={`/assets/delete${!deleteHover ? "-gray" : ""}.svg`}
            alt="share"
            width={20}
            height={20}
            className="cursor-pointer object-contain"
          />
        )}
      </div>

      {comments?.length > 0 && (
        <Link href={`/thread/${author?.name}/${id}`}>
          <p className="mt-1 text-subtle-medium text-gray-1">
            {comments?.length} replies
          </p>
        </Link>
      )}
      {deleteModalShow && (
        <DeleteModal
          id={id}
          onClose={() => setDeleteModalShow(false)}
          show={deleteModalShow}
        />
      )}
    </div>
  );
};

export default ActionsSection;
