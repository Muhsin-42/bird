import { bookmarkPost } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface BookmarkState {
  isBookmarked: boolean;
  bookmarkCount: number;
}

const useBookmark = (
  bookmark: string[],
  threadId: string,
  currentUserId: string
) => {
  const initialState: BookmarkState = {
    isBookmarked: bookmark?.some((ele) => ele === currentUserId) || false,
    bookmarkCount: bookmark?.length || 0,
  };

  const [bookmarkState, setBookmarkState] =
    useState<BookmarkState>(initialState);

  useEffect(() => {
    setBookmarkState((prevState) => ({
      ...prevState,
      isBookmarked: !prevState.isBookmarked,
      bookmarkCount: prevState.isBookmarked
        ? prevState.bookmarkCount - 1
        : prevState.bookmarkCount + 1,
    }));
  }, [bookmark]);

  const pathName = usePathname();

  async function handleBookmark() {
    setBookmarkState((prevState) => ({
      ...prevState,
      isBookmarked: !prevState.isBookmarked,
      bookmarkCount: prevState.isBookmarked
        ? prevState.bookmarkCount - 1
        : prevState.bookmarkCount + 1,
    }));
    await bookmarkPost(threadId, currentUserId, pathName);
  }

  return {
    isBookmarked: bookmarkState.isBookmarked,
    bookmarkCount: bookmarkState.bookmarkCount,
    handleBookmark,
  };
};

export default useBookmark;
