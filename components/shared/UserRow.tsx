"use client";
import clsx from "clsx";
import Image from "next/image";
import useFollow from "@/hooks/useFollow";
import type { IUserMongo } from "@/interfaces/propInterfaces";
import { Button } from "../ui/button";

const UserRow = ({
  currentUser,
  user,
}: {
  user: IUserMongo;
  currentUser: IUserMongo;
}) => {
  console.log("userr ", currentUser?.followingId?.following);
  const { handleFollow, isFollowed } = useFollow(
    user._id!,
    currentUser.followingId?.following!
  );
  return (
    <div className="flex justify-between gap-10 text-light-1">
      <div className="flex gap-2">
        <Image
          alt="logo"
          className="rounded-full"
          height={48}
          src={user.image}
          width={48}
        />
        <div className="flex flex-col">
          <span>{user?.name}</span>
          <span>@{user?.username}</span>
        </div>
      </div>

      <div className="group">
        <Button
          className={clsx(isFollowed ? "btn-transparent" : "btn-secondary")}
          onClick={() => handleFollow(currentUser._id!, user?._id!)}
          type="button"
        >
          <span className="group-hover:hidden">
            {isFollowed ? "Following" : "Follow"}
          </span>
          <span className="hidden group-hover:block">
            {isFollowed ? "Un-follow" : "Follow"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default UserRow;
