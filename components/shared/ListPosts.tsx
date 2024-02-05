"use client";
import React, { useState, useEffect } from "react";
import PostCard from "../cards/PostCard/PostCard";
import { IPostCard } from "@/interfaces/propInterfaces";
import { fetchPosts } from "@/lib/actions/thread.actions";
import useLoading from "@/hooks/useLoading";

interface IListPosts {
  posts: IPostCard[];
  currentUserId: string;
}

const ListPosts = ({ posts, currentUserId }: IListPosts) => {
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [allPosts, setAllPosts] = useState(posts);
  const { isLoading, setIsLoading } = useLoading();
  useEffect(() => {
    const loadMorePosts = async () => {
      if (!hasMore) return;

      setIsLoading(true);
      const result = await fetchPosts(page, 20);
      setIsLoading(false);
      if (result && result.isNext) {
        setAllPosts([...allPosts, ...result.posts]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadMorePosts();
    }
  }, [page, hasMore, allPosts]);

  return (
    <section className="mt-9 flex flex-col ">
      {allPosts?.length === 0 ? (
        <p className="no-result">No threads found</p>
      ) : (
        <>
          {allPosts?.map((post: any) => (
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
        </>
      )}
      {isLoading && (
        <p className="animate-pulse text-center text-gray-1">Loading...</p>
      )}
    </section>
  );
};

export default ListPosts;
