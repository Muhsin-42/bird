import Image from "next/image";
import Link from "next/link";
import PostContent from "@/components/ui/PostContent";
import type { IPostCard } from "@/interfaces/propInterfaces";
import { getTimestamp } from "@/lib/utils/utils";
import ActionsSection from "./ActionsSection";

const PostCard = ({
  id,
  currentUserId,
  content,
  author,
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
      className={`flex w-full flex-col overflow-auto rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-1 p-5 sm:p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row">
          <div className="flex flex-col items-center">
            <Link
              className="relative size-11"
              href={`/profile/${author?.username}`}
            >
              <Image
                alt="Profile Image"
                className="w-auto cursor-pointer rounded-full"
                fill
                src={author?.image}
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="ml-3 flex w-full flex-col">
            <div className="flex items-end gap-3">
              <Link className="w-fit" href={`/profile/${author?.username}`}>
                <h4 className="cursor-pointer text-light-1 text-small-medium">
                  {author?.name}
                </h4>
              </Link>
              <span className="line-clamp-1 flex text-base-medium text-gray-1 ">
                {getTimestamp(createdAt)}
              </span>
            </div>
            {isDeleted ? (
              <p
                className={
                  "mt-2 font-semibold text-dark-4 text-heading4-medium"
                }
              >
                This post was deleted by the author.
              </p>
            ) : (
              <PostContent
                author={author}
                content={content}
                id={id}
                image={image || ""}
              />
            )}

            {!isDeleted && (
              <ActionsSection
                author={author}
                bookmark={bookmark}
                comments={comments}
                currentUserId={currentUserId}
                id={id}
                isComment={isComment}
                like={like}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
