"use client";
import { bookmarkPost } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const useBookmark = (
  bookmark: string[],
  threadId: string,
  currentUserId: string
) => {
  const [isBookmarked, setIsBookmarked] = useState(
    bookmark?.some((ele) => ele === currentUserId)
  );
  const [bookmarkCount, setBookmarkCount] = useState(bookmark?.length || 0);

  useEffect(() => {
    setIsBookmarked(bookmark?.some((ele) => ele === currentUserId));
    setBookmarkCount(bookmark?.length || 0);
  }, [bookmark]);

  const pathName = usePathname();

  async function handleBookmark() {
    try {
      if (isBookmarked) {
        setIsBookmarked(false);
        setBookmarkCount((prev) => prev - 1);
      } else {
        setBookmarkCount((prev) => prev + 1);
        setIsBookmarked(true);
        toast.success("Post is Boookmarked.", { duration: 1500 });
      }
      await bookmarkPost(threadId, currentUserId, pathName);
    } catch (error) {
      toast.error("Something Went Wrong! Try Again!");
    }
  }

  return { isBookmarked, bookmarkCount, handleBookmark };
};

export default useBookmark;
