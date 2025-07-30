import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import type { IUserGeneral } from '@/interfaces/propInterfaces';

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
          className="cursor-pointer rounded-2xl px-3 py-2 text-white hover:bg-dark-4 "
          key={Math.random()}
        >
          <Link className="flex gap-3" href={`/search?q=${searchKey}`}>
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
            className="cursor-pointer rounded-2xl px-3 py-2 text-white hover:bg-dark-4 "
            key={user._id}
          >
            <Link className="flex gap-3" href={`/profile/${user?.username}`}>
              <div className="flex items-center">
                <Image
                  alt="Profile Image"
                  className="cursor-pointer rounded-full"
                  height={30}
                  src={user?.image}
                  width={30}
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
