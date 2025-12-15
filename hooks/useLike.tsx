"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { likePost } from "@/lib/actions/thread.actions";

const useLike = (like: string[], threadId: string, currentUserId: string) => {
  const [isLiked, setIsLiked] = useState(
    like?.some((ele) => ele === currentUserId)
  );
  const [likeCount, setLikeCount] = useState(like?.length || 0);

  useEffect(() => {
    setIsLiked(like?.some((ele) => ele === currentUserId));
    setLikeCount(like?.length || 0);
  }, [like]);

  const pathName = usePathname();

  async function handleLike() {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
    await likePost(threadId, currentUserId, pathName);
  }

  return { isLiked, likeCount, handleLike };
};

export default useLike;
