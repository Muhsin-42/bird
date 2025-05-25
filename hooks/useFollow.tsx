"use client";
import { followUser } from "@/lib/actions/following.actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useFollow = (userId: string, following: string[]) => {
  const [isFollowed, setIsFollowed] = useState(
    following?.some((ele) => ele === userId)
  );
  const [followCount, setFollowCount] = useState(following?.length || 0);

  useEffect(() => {
    setIsFollowed(following?.some((ele) => ele === userId));
    setFollowCount(following?.length || 0);
  }, [following]);

  async function handleFollow(currentUserId: string, userId: string) {
    try {
      if (isFollowed) {
        setIsFollowed(false);
        setFollowCount((prev) => prev - 1);
      } else {
        setFollowCount((prev) => prev + 1);
        setIsFollowed(true);
        toast.success("Followed.", { duration: 1500 });
      }
      await followUser({ currentUserId, userId });
    } catch (error) {
      toast.error("Something Went Wrong! Try Again!");
    }
  }

  return {
    isFollowed,
    followCount,
    handleFollow,
  };
};

export default useFollow;
