import React from "react";
import PostCard from "../cards/PostCard/PostCard";
import { IPostCard } from "@/interfaces/propInterfaces";

interface IListPosts {
  posts: IPostCard[];
  currentUserId: string;
}

const ListPosts = ({ posts, currentUserId }: IListPosts) => {
  return (
    <section className="mt-9 flex flex-col ">
      {posts?.length === 0 ? (
        <p className="no-result">No threads found</p>
      ) : (
        <div>
          {posts?.map((post: any) => (
            <div className="border-b border-dark-4" key={post?._id}>
              <PostCard
                key={post?._id}
                id={post?._id}
                currentUserId={currentUserId?.toString()}
                parentId={post?.parentId}
                content={post?.text}
                image={post?.image}
                createdAt={post?.createdAt}
                like={post?.like}
                bookmark={post?.bookmark}
                author={post?.author}
                community={post?.createdAt}
                comments={post?.children}
                isDeleted={post?.deleted || false}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ListPosts;
