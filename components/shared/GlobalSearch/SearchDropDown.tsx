import { IUserGeneral } from "@/interfaces/propInterfaces";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SearchDropDown({
  users,
  searchKey,
}: {
  users: IUserGeneral[];
  searchKey: string;
}) {
  return (
    <ul className="flex max-h-56 w-full flex-col overflow-y-auto rounded-2xl border border-dark-4 bg-dark-1 shadow-md shadow-white">
      {searchKey && (
        <li
          key={Math.random()}
          className="cursor-pointer rounded-2xl px-3 py-2 text-white hover:bg-dark-4 "
        >
          <Link href={`/search?q=${searchKey}`} className="flex gap-3">
            <div className="flex items-center">
              <Search />
            </div>
            <div className="flex flex-col ">
              <span>{searchKey}</span>
            </div>
          </Link>
        </li>
      )}
      {users &&
        users.length > 0 &&
        users?.map((user: IUserGeneral) => (
          <li
            key={user._id}
            className="cursor-pointer rounded-2xl px-3 py-2 text-white hover:bg-dark-4 "
          >
            <Link href={`/profile/${user?.username}`} className="flex gap-3">
              <div className="flex items-center">
                <Image
                  src={user?.image}
                  alt="Profile Image"
                  height={30}
                  width={30}
                  className="cursor-pointer rounded-full"
                />
              </div>
              <div className="flex flex-col ">
                <span>{user?.name}</span>
                <span className="text-gray-1">@{user?.username}</span>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default SearchDropDown;
