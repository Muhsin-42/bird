import { IUserGeneral } from "@/interfaces/propInterfaces";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const UserRow = ({ user }: { user: IUserGeneral }) => {
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

      <Button type="submit" className="btn-secondary">
        Follow
      </Button>
    </div>
  );
};

export default UserRow;
