"use client";
import { IUserMongo } from "@/interfaces/propInterfaces";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import useFollow from "@/hooks/useFollow";
import clsx from "clsx";

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
          src={user.image}
          alt="logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span>{user?.name}</span>
          <span>@{user?.username}</span>
        </div>
      </div>

      <div className="group">
        <Button
          type="button"
          onClick={() => handleFollow(currentUser._id!, user?._id!)}
          className={clsx(isFollowed ? "btn-transparent" : "btn-secondary")}
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
