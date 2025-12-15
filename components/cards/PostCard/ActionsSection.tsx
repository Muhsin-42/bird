"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import DeleteModal from "@/components/shared/DeleteModal";
import conf from "@/conf/config";
import useBookmark from "@/hooks/useBookmark";
import useLike from "@/hooks/useLike";
import type { IActionsSection } from "@/interfaces/propInterfaces";
import ShareComponent from "./ShareComponent";

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
            alt="heart"
            className="animate-pulse cursor-pointer object-contain"
            height={24}
            onClick={handleLike}
            src={`/assets/heart${isLiked ? "-filled" : "-gray"}.svg`}
            width={24}
          />
          <span className="text-gray-1">{likeCount}</span>
        </div>

        <Link href={`/thread/${author?.name}/${id}`}>
          <Image
            alt="reply"
            className="cursor-pointer object-contain"
            height={24}
            src="/assets/reply.svg"
            width={24}
          />
        </Link>

        <ShareComponent shareUrl={shareUrl} />

        <div className="flex items-center gap-1">
          {isBookmarked ? (
            <GoBookmarkFill
              className={"cursor-pointer text-[#5C5C7B]"}
              onClick={handleBookmark}
              size={"1.2rem"}
            />
          ) : (
            <GoBookmark
              className={"cursor-pointer text-[#5C5C7B]"}
              onClick={handleBookmark}
              size={"1.2rem"}
            />
          )}
          <span className="text-gray-1">{bookmarkCount}</span>
        </div>

        {author?._id === currentUserId && (
          <Image
            alt="share"
            className="cursor-pointer object-contain"
            height={20}
            onClick={() => setDeleteModalShow(true)}
            onMouseLeave={() => setDeleteHover(false)}
            onMouseOver={() => setDeleteHover(true)}
            src={`/assets/delete${deleteHover ? "" : "-gray"}.svg`}
            width={20}
          />
        )}
      </div>

      {comments?.length > 0 && (
        <Link href={`/thread/${author?.name}/${id}`}>
          <p className="mt-1 text-gray-1 text-subtle-medium">
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
