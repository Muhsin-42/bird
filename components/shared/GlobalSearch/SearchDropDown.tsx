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
    <ul className="bg-dark-1 border border-dark-4 shadow-md shadow-white w-full max-h-56 rounded-2xl flex flex-col overflow-y-auto">
      {searchKey && (
        <li
          key={Math.random()}
          className="text-white py-2 px-3 hover:bg-dark-4 rounded-2xl cursor-pointer "
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
            className="text-white py-2 px-3 hover:bg-dark-4 rounded-2xl cursor-pointer "
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
