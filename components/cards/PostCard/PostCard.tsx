import Image from "next/image";
import Link from "next/link";
import React from "react";
import ActionsSection from "./ActionsSection";
import { IPostCard } from "@/interfaces/propInterfaces";
import PostContent from "@/components/ui/PostContent";
import { getTimestamp } from "@/lib/utils";

const PostCard = ({
  key,
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  comments,
  like,
  isComment,
  isDeleted,
  image,
  createdAt,
  bookmark,
}: IPostCard) => {
  return (
    <article
      className={`flex w-full flex-col overflow-auto rounded-xl  ${
        isComment ? "px-0 xs:px-7" : "bg-dark-1 p-5 sm:p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${author?.username}`}
              className="relative h-11 w-11"
            >
              <Image
                src={author?.image}
                alt="Profile Image"
                fill
                className="w-auto cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="ml-3 flex w-full flex-col">
            <div className="flex  items-end gap-3">
              <Link href={`/profile/${author?.username}`} className="w-fit">
                <h4 className="cursor-pointer text-small-medium text-light-1">
                  {author?.name}
                </h4>
              </Link>
              <span className="line-clamp-1 flex text-base-medium text-gray-1 ">
                {getTimestamp(createdAt)}
              </span>
            </div>
            {!isDeleted ? (
              <PostContent
                author={author}
                id={id}
                content={content}
                image={image || ""}
              />
            ) : (
              <p
                className={`mt-2 text-heading4-medium font-semibold text-dark-4`}
              >
                This post was deleted by the author.
              </p>
            )}

            {!isDeleted && (
              <ActionsSection
                bookmark={bookmark}
                comments={comments}
                isComment={isComment}
                id={id}
                currentUserId={currentUserId}
                like={like}
                author={author}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
