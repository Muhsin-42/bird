import Image from "next/image";
import Link from "next/link";
import React from "react";
import ActionsSection from "./ActionsSection";
import { IPostCard } from "@/interfaces/propInterfaces";
import PostContent from "@/components/ui/PostContent";

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
}: IPostCard) => {
  const formatContent = () => {
    const _content = content.split("");
  };

  return (
    <article
      className={`flex w-full flex-col rounded-xl overflow-auto  ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-5 sm:p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${author?.id}`}
              className="relative h-11 w-11"
            >
              <Image
                src={author?.image}
                alt="Profile Image"
                fill
                className="cursor-pointer w-auto rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col ml-3">
            <Link href={`/profile/${author?.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author?.name}
              </h4>
            </Link>
            {!isDeleted ? (
              <PostContent content={content} />
            ) : (
              <p
                className={`mt-2 "text-slate-400 font-semibold text-heading4-medium`}
              >
                This post was deleted by the author.
              </p>
            )}

            {!isDeleted && (
              <ActionsSection
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
